class ReactSsrController < ApplicationController

  def index
    page                       = params[:page].to_i <= 0 ? 1 : params[:page].to_i
    blogs                      = Blog.visible.includes(:user).page(page).per(10)
    hots = Blog.visible.first(5)
    current_user_like_blog_ids = current_user.like_blogs.ids if current_user

    @react_props = {
      blogs:                      blogs.map { |blog| blog.to_blog_index_builder.attributes! },
      current_user_like_blog_ids: current_user_like_blog_ids,
      hots: hots.map { |blog| blog.to_hots_builder.attributes! }
    }

    respond_to do |format|
      format.html
      format.json { render json: @react_props }
    end
  end

end
