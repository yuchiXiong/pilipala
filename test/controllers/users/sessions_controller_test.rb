require 'test_helper'
require 'open-uri'

class Users::SessionsControllerTest < ActionDispatch::IntegrationTest

  # * [JSON] Post /sign_in
  # 登陆接口
  # 1. accept json 时返回 jwt
  # 2. accept 不为 json 时跳转到登陆之前的页面
  test 'email not match -> http unauthorized' do
    post sign_in_url
    assert_response :unauthorized
  end

  test 'password not match -> http unauthorized' do
    post sign_in_url, params: {
      email: users(:other_user).email,
      password: 'not match'
    }, headers: {
      accept: 'application/json'
    }
    assert_response :unauthorized
  end

  # test 'accept json -> return jwt' do
  #   post sign_in_url, {}, headers: {
  #     accept: 'application/json'
  #   }, body: {

  #   }
  #   puts @response.body
  #   assert_response :success
  # end

end
