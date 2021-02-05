class Api::UsersController < ApiController
  before_action :set_user, only: :blogs
  before_action :current_user?, only: :blogs
  skip_before_action :authenticate_user!, only: :hots

  # * Get /users/:id/blogs
  def blogs
    @blogs = @be_visited_user.blogs.kept
  end

  # * GET /users/hots
  def hots
    # ! 需要一个确定的推荐算法
    @users = User.order(followers_count: :desc).first(3)
  end

  private

  def set_user
    @be_visited_user = User.find(params[:user_id])
  end

  def current_user?
    raise AccessDeniedError if @be_visited_user.id != current_user.id
  end
end