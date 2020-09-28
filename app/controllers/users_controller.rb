class UsersController < ApplicationController

  skip_before_action :authenticate_with_user_token, only: %i[blogs]

  # * Get /users/:id/blogs
  def blogs
    user = User.find(params[:id])
    @blogs = user.blogs.kept.order(updated_at: :desc)
  end

end