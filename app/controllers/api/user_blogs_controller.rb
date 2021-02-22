class Api::UserBlogsController < ApiController
  skip_before_action :authenticate_user!
  before_action :set_user

  # * GET /api/u/:space_name/blogs/publications
  def publications
    @blogs = @be_visited_user.blogs.kept.page(params[:page]).per(10)
  end

  def popular
    @blogs = @be_visited_user.blogs.kept.order(likes_count: :desc).first(3)
    render 'api/user_blogs/publications'
  end

  private

  def set_user
    @be_visited_user = User.find_by_space_name!(params[:user_space_name])
  end

end