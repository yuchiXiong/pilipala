class Api::BlogsController < ApiController
  skip_before_action :authenticate_user!, only: [:index, :hots]
  before_action :set_blog, only: %i[delete update destroy]
  before_action :current_user?, only: %i[update destroy]

  # * GET /blogs
  def index
    @blogs = Blog.visible.includes(:user).page(params[:page]).per(10)
  end

  # * GET /blogs/:id
  def show
    @blog = Blog.find(params[:id])
  end

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

  # * GET /blogs/hots
  def hots
    # ! 没有推荐算法
    @blogs = Blog.visible.includes(:user).first(5)
    render 'api/blogs/index'
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