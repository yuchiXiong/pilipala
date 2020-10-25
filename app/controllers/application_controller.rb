class ApplicationController < ActionController::Base
  include Code
  # * jbuilder/slim同时提供了html与json的renderer
  # * 当controller渲染html时，需要进行csrf认证
  # * 当controller渲染json时，需要进行登录认证
  skip_before_action :verify_authenticity_token, if: :json_request?
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :valify_rucaptcha!, if: :devise_controller?, only: :create

  def json_request?
    request.format.json?
  end

  class ResourcesNotFound < StandardError; end

  class AccountValidError < StandardError; end

  class AccessDeniedError < StandardError; end

  class FormatNotSupport < StandardError; end

  rescue_from(FormatNotSupport) do
    logger.warn "不支持的图片格式: #{params[:file].content_type}"
    render json: { code: Code::Photo_Format_Not_Support, message: '暂仅支持gif/jpg/jpeg/png图片格式！' }, status: :bad_request
  end

  rescue_from(AccessDeniedError) do
    logger.error "#{controller_name}_#{action_name}:无权访问！"
    render json: { code: Code::Access_Denied, message: '无权访问！' }, status: :forbidden
  end

  rescue_from(ActionController::ParameterMissing) do
    logger.error "#{controller_name}_#{action_name}:参数异常或缺失！"
    render json: { code: Code::Parameter_Missing, message: '参数异常或缺失！' }, status: :bad_request
  end

  rescue_from(AccountValidError) do
    render json: { code: Code::Account_Or_Password_Not_Match, message: '用户名或密码不匹配！' }, status: :bad_request
  end

  rescue_from(ActiveRecord::RecordNotFound || ResourcesNotFound) do
    render json: { code: Code::Resource_Not_Found, message: '资源未找到' }, status: :not_found
  end

  def default_url_options(options = {})
    { protocol: Rails.env.production? ? 'https' : 'http' }
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:account_update, keys: [:nick_name, :description, :avatar])
  end

  def valify_rucaptcha!
    unless verify_rucaptcha?
      render plain: '验证码错误', status: 401
    end
  end
end
