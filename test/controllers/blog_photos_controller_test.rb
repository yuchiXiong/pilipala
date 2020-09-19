require 'test_helper'
require 'open-uri'

class BlogPhotosControllerTest < ActionDispatch::IntegrationTest

  # * 登录
  setup do
    post sessions_url, params: {
      account:  users(:success).account,
      password: '123456'
    }, headers:                {
      'Accept': 'application/json'
    }
    @user_token   = JSON.parse(@response.body)['data']['user']['userToken']
    @photo_domain = 'https://assets-blog-xiongyuchi.oss-cn-beijing.aliyuncs.com'.freeze
  end


  # * Post /blog_photos
  # * 上传博客插图
  # * 1. 博客存在时，上传成功
  # * 2. 博客不存在时，返回博客不存在
  # * 3. 不应该接受任何其它类型的文件
  # * 4. 未登录时提示未登录
  test 'should upload success when blog exist' do
    post blog_photos_url, params: {
      blogId: blogs(:success).id,
      file:   fixture_file_upload('/test_file.png', 'image/png')
    }, headers:                   {
      'Accept':     'application/json',
      'User-Token': @user_token
    }

    assert_response :success
    assert_equal JSON.parse(@response.body)['message'], 'success'
    assert_instance_of String, JSON.parse(@response.body)['data']['photoURL']
    assert_not_nil open(@photo_domain + JSON.parse(@response.body)['data']['photoURL'])
  end

  test 'should return blog not found' do
    post blog_photos_url, params: {
      blogId: 'not found',
      file:   fixture_file_upload('/test_file.png', 'image/png')
    }, headers:                   {
      'Accept':     'application/json',
      'User-Token': @user_token
    }

    assert_response :not_found
    assert_equal Code::Resource_Not_Found, JSON.parse(@response.body)['code']
    assert_nil JSON.parse(@response.body)['data']
  end

  test 'should upload only image file' do
    post blog_photos_url, params: {
      blogId: blogs(:success).id,
      file:   fixture_file_upload('/error_format_file.txt')
    }, headers:                   {
      'Accept':     'application/json',
      'User-Token': @user_token
    }

    assert_response :bad_request
    assert_equal Code::Photo_Format_Not_Support, JSON.parse(@response.body)['code']
    assert_nil JSON.parse(@response.body)['data']
  end

  test 'not login should not upload' do
    post blog_photos_url, params: {
      blogId: blogs(:success).id,
      file:   fixture_file_upload('/test_file.png', 'image/png')
    }, headers:                   {
      'Accept': 'application/json',
    }

    assert_response :unauthorized
    assert_equal Code::Unauthorized_Error, JSON.parse(@response.body)['code']
    assert_nil JSON.parse(@response.body)['data']
  end

  test 'if login state expired then should not upload' do

    user_token = ''

    # * travel_to 代码块模拟了在8天前进行登录，并获取了对应的token用于验证token过期时是否能够得到合理的响应
    travel_to Time.current - 8.days do
      post sessions_url, params: {
        account:  users(:success).account,
        password: '123456'
      }, headers:                {
        'Accept': 'application/json'
      }
      user_token = JSON.parse(@response.body)['data']['user']['userToken']
    end

    post blog_photos_url, params: {
      blogId: blogs(:success).id,
      file:   fixture_file_upload('/test_file.png', 'image/png')
    }, headers:                   {
      'Accept':     'application/json',
      'User-Token': user_token
    }

    assert_response :unauthorized
    assert_equal Code::Unauthorized_Expired, JSON.parse(@response.body)['code']
    assert_nil JSON.parse(@response.body)['data']
  end

end
