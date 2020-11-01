class ApplicationController < ActionController::Base
  include Code
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :verify_captcha!, if: :devise_controller?, only: :create

  class ResourcesNotFound < StandardError; end

  class AccessDeniedError < StandardError; end

  rescue_from(ActiveRecord::RecordNotFound || ResourcesNotFound) do
    render template: 'not_found/show'
  end

  rescue_from(AccessDeniedError) do
    render template: 'access_denied/show'
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

  def verify_captcha!
    case "#{controller_name}__#{action_name}"
    when 'sessions__create'
      render plain: '验证码错误', status: 401 unless verify_rucaptcha?
    else
      redirect_to new_user_registration_url, flash: { captcha: '验证码错误' } unless verify_rucaptcha?
    end
  end
end
