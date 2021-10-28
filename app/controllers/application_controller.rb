class ApplicationController < ActionController::Base
  include Code
  before_action :authenticate_user!

  class ResourcesNotFound < StandardError; end

  class AccessDeniedError < StandardError; end

  rescue_from(ActiveRecord::RecordNotFound || ResourcesNotFound) do
    render template: 'not_found/show', status: :not_found
  end

  rescue_from(AccessDeniedError) do
    notice('您没有权限进行当前操作！', {
      messages: [],
      type: :alert,
      status: :bad_request,
      url: root_path
    })
  end

  rescue_from(ActionController::ParameterMissing) do
    notice('服务端异常！请检测参数的完整性！', {
      messages: [],
      type: :alert,
      status: :bad_request,
      url: root_path
    })
  end

  def default_url_options(options = {})
    { protocol: Rails.env.production? ? 'https' : 'http' }
  end

  def notice(content, options = {})
    url = options[:url] || request.headers['Referer']
    type = options[:type] || :notice
    messages = options[:messages] || []
    status = options[:status] || :ok

    redirect_to url, type => {
      content: content,
      messages: messages
    }, status: status
  end

end
