class BlogsController < ApplicationController
  skip_before_action :authenticate_with_user_token, only: [:index, :show]

  Single_Page_Data_num = 10

  # * GET /api/v1/blogs
  def index
    @page = params[:page].to_i || 1
    blogs = Blog.order("created_at desc")
    @blogs = if @page.to_i <= 0
               blogs.limit(Single_Page_Data_num)
             else
               blogs.offset((@page - 1) * Single_Page_Data_num).limit(Single_Page_Data_num)
             end
  end

  # * GET /api/v1/blog/:id
  def show
    @blog = Blog.find(params[:id])
  end

  # * POST /api/v1/blog
  def create
    @blog = Blog.new(blog_params)
    @blog.user_id = @current_user.id
    unless @blog.save
      @errors = @blog.errors
    end
  end

  # * DELETE /api/v1/blog/:id
  def destroy
    @blog = Blog.find(params[:id])
    unless @blog.user_id == @current_user.id
      raise AccessDeniedError
    end
    unless @blog.delete
      @errors = @blog.errors
    end
  end

  private

  def blog_params
    params.require(:blog).permit(:title, :content, :description, :cover)
  end
end