class Api::UsersController < ApiController
  before_action :set_user, only: [:popular, :show, :avatar, :info]
  before_action :current_user?, only: [:avatar, :info]
  skip_before_action :authenticate_user!, only: [:popular, :show]

  # * GET /api/u/popular
  def popular
    # ! 需要一个确定的推荐算法
    @authors = User.order(followers_count: :desc).first(3)
  end

  # * GET /api/u/:space_name
  def show
    # before_action :set_user
  end

  # * PUT/PATCH /api/u/:space_name/avatar
  def avatar
    current_user.update!(user_avatar_params)
  end

  # * PUT/PATCH /api/u/:space_name/info
  def info
    current_user.update!(user_info_params)
  end

  private

  def set_user
    @be_visited_user = User.find_by_space_name!(params[:space_name] || params[:user_space_name])
  end

  def current_user?
    raise AccessDeniedError if @be_visited_user.id != current_user.id
  end

  def user_avatar_params
    params.require(:user).permit(:avatar)
  end

  def user_info_params
    params.require(:user)
          .permit(:description, :email, :nickName, :spaceName)
          .transform_keys { |k| k.to_s.underscore }
  end

end