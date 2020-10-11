class UsersController < ApplicationController
  before_action :set_user, only: %i[show]
  skip_before_action :authenticate_with_user_token, only: %i[blogs]

  # * Get /users/:id
  def show
    @user_blogs   = @current_user.blogs.kept.where(released: true).order(updated_at: :desc)
  end

  # * Get /users/:id/blogs
  def blogs
    @blogs = user.blogs.kept.order(updated_at: :desc)
  end

  private

  def set_user
    @current_user = User.find(params[:id])
  end

end