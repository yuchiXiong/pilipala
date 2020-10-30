class UsersController < ApplicationController
  before_action :set_user, only: %i[show blogs]
  skip_before_action :authenticate_user!, only: %i[show]

  # * Get /users/:id
  def show
    @user_blogs = @be_visited_user.blogs.visible
  end

  # * Get /users/:id/blogs
  def blogs
    raise AccessDeniedError if @be_visited_user.id != current_user.id

    @blogs = @be_visited_user.blogs.kept
  end

  def update_info
    puts '11'
  end

  private

  def set_user
    @be_visited_user = User.find(params[:id])
  end

end