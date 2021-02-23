class Api::BlogCommentsController < ApiController
  before_action :set_blog
  skip_before_action :authenticate_user!, only: %i[index]

  # * GET /api/blogs/:blog_id/comments
  def index
    @comments = @blog.comments.includes(:user)
  end

  # * POST /api/blogs/:blog_id/comments
  def create
    @comment = @blog.comments.new(comment_params)
    @comment.user = current_user
    @comment.save!
  end

  # * DELETE /api/blogs/:blog_id/comments/:id
  def destroy
    @comment = Comment.find(params[:id])
    raise AccessDeniedError unless current_user.id == @comment.user_id

    @comment.destroy
  end

  def comment
    @comment_id = params[:id]
  end

  private

  def set_blog
    @blog = Blog.find(params[:blog_id])
  end

  def comment_params
    params.require(:comment).permit(:content, :comment_id)
  end
end