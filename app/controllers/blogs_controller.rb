require 'ali/content_scan'

class BlogsController < ApplicationController
  # skip_before_action :authenticate_user!, except: %i[like]

  # * GET /blogs
  def index
    blogs = Blog.visible.includes(:user).page(params[:page]).per(10)
    hots = Blog.visible.includes(:user).first(5)

    @react_props = {
      blogs:                  blogs.map { |_| _.to_json },
      currentUserLikeBlogIds: current_user ? current_user.like_blogs.ids : [],
      hotBlogs:               hots.map { |_| _.to_json },
      hotAuthors:             User.order(followers_count: :desc).limit(5).map { |_| _.to_json }
    }
  end

  # * GET /blogs/:id
  def show
    blog = Blog.find(params[:id])
    current_user.read_blog(blog) if current_user
    raise ActiveRecord::RecordNotFound unless blog.readable?
    @react_props = {
      blog:        blog.to_blog_show_builder.attributes!,
      other_blogs: blog.user.blogs.visible.take(6).reject { |b| b.id == blog.id }.map { |b| b.to_blog_index_builder.attributes! }
    }
  end

  # * POST /blogs/:id/like
  # def like
  #   @blog = Blog.find(params[:id])
  #   if current_user.like_blog?(@blog)
  #     current_user.unlike_blog(@blog)
  #   else
  #     current_user.like_blog(@blog)
  #   end
  #   redirect_to @blog
  # end

end
