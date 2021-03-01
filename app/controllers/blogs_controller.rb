require 'ali/content_scan'

class BlogsController < ApplicationController
  skip_before_action :authenticate_user!, except: %i[like]

  # * GET /
  def index
    blogs = Blog.visible.includes(:user).limit(10)
    # ! 没有推荐算法
    hots = Blog.visible.includes(:user).first(5)

    @react_props = {
      blogPage:    {
        pageNo:                 2,
        noMore:                 true,
        blogs:                  blogs.map { |_| _.to_json },
        currentUserLikeBlogIds: current_user ? current_user.like_blogs.ids : [],
        popularBlogs:           hots.map { |_| _.to_json },
        popularAuthors:         User.order(followers_count: :desc).limit(5).map { |_| _.to_json }
      },
      currentUser: current_user ? current_user.to_json : nil
    }
  end

  # * GET /blogs/:id
  def show
    blog = Blog.find(params[:id])
    current_user.read_blog(blog) if current_user
    raise ActiveRecord::RecordNotFound unless blog.readable?
    @react_props = {
      blogShowPage: {
        blog:       blog.to_json(true),
        otherBlogs: blog.user.blogs.visible.take(6).reject { |b| b.id == blog.id }.map { |_| _.to_json },
        comments:   blog.comments.includes(:user).map { |_| _.to_json }
      },
      currentUser:  current_user ? current_user.to_json : nil
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
