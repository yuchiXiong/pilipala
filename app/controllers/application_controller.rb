class ApplicationController < ActionController::Base
  include Code
  # * jbuilder/slim同时提供了html与json的renderer
  # * 当controller渲染html时，需要进行csrf认证
  # * 当controller渲染json时，需要进行登录认证
  before_action :authenticate_with_user_token, if: :json_request?
  skip_before_action :verify_authenticity_token, if: :json_request?

  def json_request?
    request.format.json?
  end

  class ResourcesNotFound < StandardError; end

  class AccountValidError < StandardError; end

  class AccessDeniedError < StandardError; end

  class FormatNotSupport < StandardError; end

  def authenticate_with_user_token
    user_token = request.headers['User-Token']
    @current_user = User.user_valid! user_token
  rescue JWT::ExpiredSignature
    render json: { code: Code::Unauthorized_Expired, message: '登录已失效，请重新登录', data: nil }, status: :unauthorized
  rescue JWT::DecodeError
    render json: { code: Code::Unauthorized_Error, message: '身份验证异常', data: nil }, status: :unauthorized
  end

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
end
