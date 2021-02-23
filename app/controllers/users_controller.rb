class UsersController < ApplicationController
  before_action :set_user, only: %i[show update_info follow]
  # skip_before_action :authenticate_user!, only: %i[show]
  before_action :current_user?, only: %i[update_info]

  # * Get /users/:id
  def show
    user_blogs = @be_visited_user.blogs.visible
    current_user_like_blog_ids = current_user.like_blogs.ids if current_user
    @react_props = {
      userPage: {
        current_user:           current_user ? current_user.to_json : nil,
        beVisitedUser:          @be_visited_user.to_json,
        userBlogs:              user_blogs.map { |_| _.to_json },
        currentUserLikeBlogIds: current_user_like_blog_ids
      }
    }
    respond_to do |format|
      format.html
      format.json { render json: @react_props }
    end
  end

  # def update_info
  #   @be_visited_user.update(user_params)
  #   redirect_to update_info_user_url(@be_visited_user), notice: {
  #     content: '修改成功'
  #   }
  #   notice('修改成功')
  # end
  #
  # def follow
  #   if current_user.follow_user? @be_visited_user
  #     current_user.unfollow_user @be_visited_user
  #     tips = "您取消关注了 #{@be_visited_user.nick_name} !"
  #   else
  #     current_user.follow_user @be_visited_user
  #     tips = "您关注了 #{@be_visited_user.nick_name} !"
  #   end
  #   notice(tips)
  # end

  private

  def current_user?
    raise AccessDeniedError if @be_visited_user.id != current_user.id
  end

  def set_user
    @be_visited_user = User.find_by_space_name!(params[:space_name])
  end

  def user_params
    params.require(:user).permit(:nick_name, :description, :avatar)
  end

end