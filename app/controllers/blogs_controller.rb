require 'ali/content_scan'

class BlogsController < ApplicationController
  before_action :set_blog, only: %i[show update destroy]
  skip_before_action :authenticate_user!, only: %i[index show]

  # * GET /blogs
  def index
    @page              = params[:page].to_i <= 0 ? 1 : params[:page].to_i
    all_released_blogs = Blog.kept.released.includes(:user)
    @blogs = all_released_blogs.page(@page).per(10)
    respond_to do |format|
      format.html
      format.js
      format.json
    end
  end

  # * GET /blogs/:id
  def show
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
