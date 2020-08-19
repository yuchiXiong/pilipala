class ApplicationController < ActionController::Base
  include Code
  before_action :authenticate_with_user_token

  class ResourcesNotFound < StandardError; end

  class AccountValidError < StandardError; end

  def authenticate_with_user_token
    user_token = request.headers['User-Token']
    @current_user = User.user_valid! user_token
  rescue JWT::ExpiredSignature
    render json: {code: Code::Unauthorized_Expired, message: '登录已失效，请重新登录', data: nil}, status: :unauthorized
  rescue JWT::DecodeError
    render json: {code: Code::Unauthorized_Error, message: '身份验证异常', data: nil}, status: :unauthorized
  end

  rescue_from(AccountValidError) do
    render json: {code: 400, message: '用户名和密码不匹配！'}, status: :bad_request
  end

  rescue_from(ActiveRecord::RecordNotFound || ResourcesNotFound) do
    render json: {code: 404, message: '资源未找到'}, status: :not_found
  end
end
