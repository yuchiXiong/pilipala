require 'ali/content_scan'

class BlogsController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[index show]

  # * GET /blogs
  def index
    @page              = params[:page].to_i <= 0 ? 1 : params[:page].to_i
    all_released_blogs = Blog.visible.includes(:user)
    @blogs             = all_released_blogs.page(@page).per(10)
    respond_to do |format|
      format.html
      format.js
    end
  end

  # * GET /blogs/:id
  def show
    @blog = Blog.find(params[:id])
    raise ActiveRecord::RecordNotFound unless @blog.readable?
  end

end
