class Api::CommentsController < ApiController
  before_action :set_blog

  # * POST /api/blogs/:blog_id/comments
  def create
    @comment = @blog.comments.new(comment_params)
    @comment.user = current_user
    @comment.save!
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

  def comment_params
    params.require(:comment).permit(:content, :comment_id)
  end
end