require 'test_helper'

class SeesionControllerTest < ActionDispatch::IntegrationTest

  test 'show login success' do
    post api_v1_sessions_url, params: {
        account: users(:success).account,
        password: users(:success).password
    }, headers: {
        'Accept': 'application/json'
    }
    assert_response :success
    puts @response.body
    assert_equal JSON.parse(@response.body)['message'], 'success'
    assert_not_nil JSON.parse(@response.body)['data']['user']['userToken']
  end

  test 'show login failure' do
    post api_v1_sessions_url, params: {
        account: users(:success).account,
        password: ''
    }, headers: {
        'Accept': 'application/json'
    }
    assert_response :success
    puts @response.body
    assert_equal JSON.parse(@response.body)['message'], '用户名与密码不匹配'
    assert_nil JSON.parse(@response.body)['data']
  end

end
