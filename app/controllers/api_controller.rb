class ApiController < ActionController::API
  before_action :authenticate_user!
  before_action :only_api

  class FormatNotSupport < StandardError; end

  class ResourcesNotFound < StandardError; end

  class AccessDeniedError < StandardError; end

  rescue_from(FormatNotSupport) do
    render json: { code: Code::PHOTO_FORMAT_NOT_SUPPORT, message: '暂仅支持gif/jpg/jpeg/png图片格式！' }, status: :bad_request
  end

  rescue_from(ActiveRecord::RecordNotFound || ResourcesNotFound) do
    render json: { code: Code::RESOURCE_NOT_FOUND, message: '资源未找到' }, status: :not_found
  end

  rescue_from(AccessDeniedError) do
    render json: { code: Code::ACCESS_DENIED, message: '无权访问！' }, status: :forbidden
  end

  rescue_from(ActionController::ParameterMissing) do
    render json: { code: Code::PARAMETER_MISSING, message: '参数异常！' }, status: :bad_request
  end

  private

  def only_api
    request.format = :json
  end

end