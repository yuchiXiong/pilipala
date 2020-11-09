class UsersController < ApplicationController
  before_action :set_user, only: %i[show update_info]
  skip_before_action :authenticate_user!, only: %i[show]
  before_action :current_user?, only: %i[update_info]

  # * Get /users/:id
  def show
    @user_blogs = @be_visited_user.blogs.visible
  end

  def update_info
    @be_visited_user.update(user_params)
    if user_params[:avatar]
      redirect_to update_info_user_url @be_visited_user
    else
      render_notice("修改成功！")
    end
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