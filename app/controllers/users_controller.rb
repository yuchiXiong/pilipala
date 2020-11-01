class UsersController < ApplicationController
  before_action :set_user, only: %i[show blogs update_info]
  skip_before_action :authenticate_user!, only: %i[show]

  # * Get /users/:id
  def show
    @user_blogs = @be_visited_user.blogs.visible
  end

  # * Get /users/:id/blogs
  def blogs
    @blogs = @be_visited_user.blogs.kept
  end

  def update_info
    @be_visited_user.update(user_params)
  end

  private

  def current_user?
    raise AccessDeniedError if @be_visited_user.id != current_user.id
  end

  def set_user
    @be_visited_user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:nick_name, :description, :avatar)
  end

end