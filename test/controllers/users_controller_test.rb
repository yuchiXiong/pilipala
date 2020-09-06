require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest

  # * Get /users/:id/blogs
  # * 1. 应该获取当前用户的博客列表
  # * 2. 未登录时返回未登录
  test 'should return user blogs' do
    get blogs_user_url(users(:success)), {
        headers: {
            Accept: 'application/json'
        }
    }
    assert_response :success
    assert_instance_of Array, JSON.parse(@response.body)['data']['blogs']
  end

  test 'should return user not found' do
    get blogs_user_url('not found'), {
        headers: {
            Accept: 'application/json'
        }
    }
    assert_response :not_found
    assert_nil JSON.parse(@response.body)['data']
  end

end