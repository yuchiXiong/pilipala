class Api::BlogsController < ApiController
  skip_before_action :authenticate_user!, only: [:index, :popular, :show]
  before_action :set_blog, only: %i[delete update destroy]
  before_action :current_user?, only: %i[update destroy]

  # * GET /api/blogs
  # * 获取博客列表
  def index
    @blogs = Blog.visible.includes(:user).page(params[:page]).per(10)
  end

  # * GET api/blogs/:id
  # * 获取博客详情
  def show
    @blog = Blog.find(params[:id])
  end

  # * POST /api/blogs
  # * 创建博客
  def create
    @blog         = Blog.new(blog_params)
    @blog.user_id = current_user.id
    @errors       = @blog.errors unless @blog.save
  end

  # * PUT/PATCH /blogs/:id
  # * 更新博客
  def update
    @errors = @blog.errors unless @blog.update(blog_params)
  end

  # * DELETE /blogs/:id
  # * 软删除博客
  def destroy
    @errors = @blog.errors unless @blog.discard
  end

  # * GET /api/blogs/popular
  # * 大家都在看
  def popular
    # ! 没有推荐算法
    # @blogs = Blog.visible.includes(:user).first(5)
    @blogs = Blog.visible.includes(:user).order(:reads_count)
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