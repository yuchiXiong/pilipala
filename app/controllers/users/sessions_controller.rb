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
    self.resource = warden.authenticate?(auth_options)
    return render js: "alert('用户名或密码错误')" unless resource
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
    render js: "alert('captcha error!')" unless verify_rucaptcha?
  end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
