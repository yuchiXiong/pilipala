require 'test_helper'

class SeesionsControllerTest < ActionDispatch::IntegrationTest

  test 'should login success' do
    post api_v1_sessions_url, params: {
        account: users(:success).account,
        password: '123456'
    }
    assert_response :success
    assert_equal JSON.parse(@response.body)['message'], 'success'
    assert_not_nil JSON.parse(@response.body)['data']['user']['userToken']
  end

  test 'should login failure' do
    post api_v1_sessions_url, params: {
        account: users(:success).account,
        password: ''
    }
    assert_response :success
    assert_equal JSON.parse(@response.body)['message'], '用户名与密码不匹配'
    assert_nil JSON.parse(@response.body)['data']
  end

end
