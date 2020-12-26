class AdminController < ActionController::Base
  layout 'admin'
  before_action :authenticate_user!
  before_action :require_admin

  private

  def require_admin
    redirect_to root_url unless current_user.is_admin
  end
end