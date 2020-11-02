class Api::BlogsController < ApiController
  before_action :set_blog, only: %i[delete update destroy]
  before_action :current_user?, only: %i[update destroy]

  # * POST /blogs
  def create
    @blog         = Blog.new(blog_params)
    @blog.user_id = current_user.id
    @errors       = @blog.errors unless @blog.save
  end

  # * PUT/PATCH /blogs/:id
  def update
    @errors = @blog.errors unless @blog.update(blog_params)
  end

  # * DELETE /blogs/:id
  def destroy
    @errors = @blog.errors unless @blog.discard
  end

  private

  def set_blog
    @blog = Blog.find(params[:id])
  end

  def current_user?
    raise AccessDeniedError unless @blog.user_id == current_user.id
  end

  def blog_params
    params.require(:blog).permit(:title, :content, :description, :cover, :released)
  end

end