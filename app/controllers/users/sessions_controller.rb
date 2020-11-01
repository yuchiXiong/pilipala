# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  before_action :verify_captcha, only: :create
  skip_before_action :authenticate_user!, only: :create
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    return render_notice_danger('登陆失败', '用户名与密码不匹配', {
      status: :unauthorized
    }) unless warden.authenticate?(auth_options)
    # return render js: "notice('登陆失败', #{['用户名与密码不匹配！']})", status: :unauthorized unless resource
    self.resource = warden.authenticate!(auth_options)
    set_flash_message!(:notice, :signed_in)
    sign_in(resource_name, resource)
    yield resource if block_given?
    respond_with resource, location: after_sign_in_path_for(resource)
  end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  protected

  def verify_captcha
    render_notice_danger('登陆失败', '验证码错误', {
      status: :unauthorized
    }) unless verify_rucaptcha?
  end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
