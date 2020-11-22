class CommentsController < ApplicationController
  before_action :set_blog

  def create
    redirect_to new_user_session_url unless current_user
    @comment = Comment.new(user_id: current_user.id, content: params[:comment][:content], blog_id: @blog.id)
    if params[:comment][:comment_id]
      @comment.comment_id = params[:comment][:comment_id]
    end
    @comment.save
    render 'comments/create.js.erb'
  end

  def destroy
    # Comment.find(params[:id]).delete
    redirect_to @blog
  end

  def comment
    @comment_id = params[:id]
  end


  private

  def set_blog
    @blog = Blog.find(params[:blog_id])
  end

end