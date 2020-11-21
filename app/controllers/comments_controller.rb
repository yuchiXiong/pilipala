class CommentsController < ApplicationController
  before_action :set_blog

  def create
    redirect_to new_user_session_url unless current_user
    @comment = Comment.create(user_id: current_user.id, content: params[:comment][:content], blog_id: @blog.id)
    render 'comments/create.js.erb'
  end

  private

  def set_blog
    @blog = Blog.find(params[:blog_id])
  end
end