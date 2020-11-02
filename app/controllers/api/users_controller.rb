class Api::UsersController < ApiController
  before_action :set_user, only: :blogs
  before_action :current_user?, only: :blogs

  # * Get /users/:id/blogs
  def blogs
    @blogs = @be_visited_user.blogs.kept
  end

  private

  def set_user
    @be_visited_user = User.find(params[:user_id])
  end

  def current_user?
    raise AccessDeniedError if @be_visited_user.id != current_user.id
  end
end