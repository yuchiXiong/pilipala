require 'ali/content_scan'

class BlogsController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[index show]

  # * GET /blogs
  def index
    @page                       = params[:page].to_i <= 0 ? 1 : params[:page].to_i
    all_released_blogs          = Blog.visible.includes(:user)
    @blogs                      = all_released_blogs.page(@page).per(10)
    @hots                       = Blog.visible.first(5)
    @current_user_like_blog_ids = current_user.like_blogs.ids if current_user
    respond_to do |format|
      format.html
      format.js
    end
  end

  # * GET /blogs/:id
  def show
    @blog = Blog.find(params[:id])
    current_user.read_blog(@blog) if current_user
    @comment = Comment.new
    raise ActiveRecord::RecordNotFound unless @blog.readable?
  end

  # * POST /blogs/:id/like
  def like
    @blog = Blog.find(params[:id])
    if current_user.like_blog?(@blog)
      current_user.unlike_blog(@blog)
    else
      current_user.like_blog(@blog)
    end
    redirect_to @blog
  end

end
