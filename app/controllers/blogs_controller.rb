require 'ali/content_scan'

class BlogsController < ApplicationController
  # skip_before_action :authenticate_user!, except: %i[like]

  # * GET /blogs
  def index
    page                       = params[:page].to_i <= 0 ? 1 : params[:page].to_i
    blogs                      = Blog.visible.includes(:user).page(page).per(10)
    hots                       = Blog.visible.first(5)
    current_user_like_blog_ids = current_user.like_blogs.ids if current_user

    @react_props = {
      blogs:                      blogs.map { |blog| blog.to_blog_index_builder.attributes! },
      current_user_like_blog_ids: current_user_like_blog_ids,
      hot_blogs:                  hots.map { |blog| blog.to_hots_builder.attributes! },
      hot_authors:                User.order(followers_count: :desc).limit(5).map { |user| user.to_user_info_builder.attributes! }
    }

    respond_to do |format|
      format.html
      format.json { render json: @react_props }
    end
  end

  # * GET /blogs/:id
  def show
    blog = Blog.find(params[:id])
    current_user.read_blog(blog) if current_user
    # comment = Comment.new
    raise ActiveRecord::RecordNotFound unless blog.readable?
    @react_props = {
      blog: blog.to_blog_show_builder.attributes!
    }
    respond_to do |format|
      format.html
      format.json { render json: @react_props }
    end
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
