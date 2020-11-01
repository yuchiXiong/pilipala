class ApplicationController < ActionController::Base
  include Code
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  class ResourcesNotFound < StandardError; end

  class AccessDeniedError < StandardError; end

  rescue_from(ActiveRecord::RecordNotFound || ResourcesNotFound) do
    render template: 'not_found/show'
  end

  rescue_from(AccessDeniedError) do
    respond_to do |format|
      format.html { render template: 'access_denied/show' }
      format.js { render js: "alert('您无权进行该操作！')" }
    end
  end

  rescue_from(ActionController::ParameterMissing) do
    render js: "alert('服务端异常！请检测参数的完整性！')"
  end

  def default_url_options(options = {})
    { protocol: Rails.env.production? ? 'https' : 'http' }
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:account_update, keys: [:nick_name, :description, :avatar])
  end

end
