require 'test_helper'

class BlogPhotosControllerTest < ActionDispatch::IntegrationTest

  # * 登录
  setup do
    post sessions_url, params: {
        account: users(:success).account,
        password: '123456'
    }, headers: {'Accept': 'application/json'}
    @user_token = JSON.parse(@response.body)['data']['user']['userToken']
  end

  # * Post /blog_photos
  # * 上传博客插图
  # * 1. 应该获得响应
  # * 2. 博客存在时，上传成功
  # * 3. 博客不存在时，返回博客不存在
  # * 4. 应该将图片传到oss中的正确bucket里
  test 'should get success response' do
    post blog_photos_url, params: {}, headers: {
        'Accept': 'application/json',
        'User-Token': @user_token
    }
    assert_response :success
  end

  test 'should upload success when blog exist' do
    post blog_photos_url, params: {
        id: blogs(:success).id
    }, headers: {
        'Accept': 'application/json',
        'User-Token': @user_token
    }

    res = JSON.parse(@response.body)
    assert_response :success
    # assert
  end
end
