class BlogsController < ApplicationController
  skip_before_action :authenticate_with_user_token, only: %i[index show]
  before_action :set_blog, only: %i[show update destroy]

  SINGLE_PAGE_DATA_NUM = 10

  # * GET /blogs
  def index
    @page               = params[:page].to_i || 1
    @all_released_blogs = Blog.kept.where(released: true).order(updated_at: :desc).includes(:user)
    @blogs              = if @page.to_i <= 0
                            @all_released_blogs.limit(SINGLE_PAGE_DATA_NUM)
                          else
                            @all_released_blogs.offset((@page - 1) * SINGLE_PAGE_DATA_NUM).limit(SINGLE_PAGE_DATA_NUM)
                          end
  end

  # * GET /blogs/:id
  def show
    @test1 = <<-EOF
    | 1 | 2 | 3 |  4| 5 |
    | --- | --- | --- | --- | --- |
    | q | w | e | r | t |
    | a | s | d | f | g |
    | z | x | c | v | b |
    EOF
    @test2 = '_111_'
    raise ActiveRecord::RecordNotFound unless @blog.released
  end

  # * POST /blogs
  def create
    @blog         = Blog.new(blog_params)
    @blog.user_id = @current_user.id
    @errors       = @blog.errors unless @blog.save
  end

  # * PUT/PATCH /blogs/:id
  def update
    raise AccessDeniedError unless @blog.user_id == @current_user.id
    @errors = @blog.errors unless @blog.update(blog_params)
  end

  # * DELETE /blogs/:id
  def destroy
    raise AccessDeniedError unless @blog.user_id == @current_user.id
    @errors = @blog.errors unless @blog.discard
  end

  private

  def set_blog
    @blog = Blog.find(params[:id])
  end

  def blog_params
    params.require(:blog).permit(:title, :content, :description, :cover, :released)
  end
end
