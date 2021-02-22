class Api::UsersController < ApiController
  before_action :set_user, only: [:popular_blogs, :show, :publications]
  # before_action :current_user?, only: :blogs
  # skip_before_action :authenticate_user!, only: [:hots, :blogs, :show]
  skip_before_action :authenticate_user!

  def popular
    # ! 需要一个确定的推荐算法
    @authors = User.order(followers_count: :desc).first(3)
  end

  # * GET /api/u/:space_name
  def show
    # before_action :set_user
  end

  private

  def set_user
    @be_visited_user = User.find_by_space_name!(params[:space_name] || params[:user_space_name])
  end

  def current_user?
    raise AccessDeniedError if @be_visited_user.id != current_user.id
  end
end