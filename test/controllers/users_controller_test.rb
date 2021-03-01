require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  # * [JSON] Get /users/:id/blogs
  # * 获取指定id用户的所有博客
  # * 1. 未登录
  # * 2. 登录 -> 用户不存在
  # * 3. 登录 -> 用户存在 -> 访问的用户与被访问的用户不同
  # * 4. 成功
  test 'need login before fetch user blogs' do
    get api_user_blogs_url(users(:success))
    assert_response :redirect
    assert_select 'a' do |element|
      assert_equal element[0]['href'], new_user_session_url
    end
  end

  test 'can not fetch blogs because user not exists' do
    sign_in users(:success)
    get api_user_blogs_url('not found'), {
      headers: {
        Accept: 'application/json'
      }
    }
    assert_response :not_found
    assert_equal JSON.parse(@response.body)['code'], Code::RESOURCE_NOT_FOUND
  end

  test 'can not fetch blogs because current user is not be visited user' do
    sign_in users(:success)
    get api_user_blogs_url(users(:other_user)), {
      headers: {
        Accept: 'application/json'
      }
    }
    assert_response :forbidden
    assert_equal JSON.parse(@response.body)['code'], Code::ACCESS_DENIED
  end

  test 'fetch user blogs' do
    sign_in users(:success)
    get api_user_blogs_url(users(:success)), {
      headers: {
        Accept: 'application/json'
      }
    }
    assert_response :success
    assert_equal JSON.parse(@response.body)['code'], Code::SUCCESS
    assert_instance_of Array, JSON.parse(@response.body)['data']['blogs']
  end

end