class CommentsController < ApplicationController
  before_action :set_blog

  def create
    @comment = Comment.new(user_id: current_user.id, content: params[:comment][:content], blog_id: @blog.id)
    if params[:comment][:comment_id]
      @comment.comment_id = params[:comment][:comment_id]
    end
    @comment.save
    render 'comments/create.js.erb'
  end

  def destroy
    @comment = Comment.find(params[:id])
    raise AccessDeniedError unless current_user.id == @comment.user_id
    if @comment.comment_id.nil?
      @comment.sub_comments.destroy_all
    end
    @comment.delete
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