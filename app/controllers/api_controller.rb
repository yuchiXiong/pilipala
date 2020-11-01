class ApiController < ActionController::API

  # class FormatNotSupport < StandardError; end
  #
  # class ResourcesNotFound < StandardError; end
  #
  # class AccessDeniedError < StandardError; end
  #
  # rescue_from(FormatNotSupport) do
  #   render json: { code: Code::Photo_Format_Not_Support, message: '暂仅支持gif/jpg/jpeg/png图片格式！' }, status: :bad_request
  # end
  #
  # rescue_from(ActiveRecord::RecordNotFound || ResourcesNotFound) do
  #   render json: { code: Code::Resource_Not_Found, message: '资源未找到' }, status: :not_found
  # end
  #
  # rescue_from(AccessDeniedError) do
  #   render json: { code: Code::Access_Denied, message: '无权访问！' }, status: :forbidden
  # end

end