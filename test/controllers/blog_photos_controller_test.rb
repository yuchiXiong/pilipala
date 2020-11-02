require 'test_helper'
require 'open-uri'

class BlogPhotosControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @photo_domain = 'https://assets-blog-xiongyuchi.oss-cn-beijing.aliyuncs.com'.freeze
  end

  # * [JSON] Post /blog_photos
  # * 上传博客插图: 用户A上传图片文件至用户A的博客A
  # * 1. 未登录
  # * 2. 登陆 -> 但博客不存在
  # * 3. 登陆 —> 博客存在 -> 作者不是当前用户
  # * 4. 登陆 -> 博客存在 -> 作者是当前用户 -> 文件格式不支持
  # * 5. 登陆 -> 博客存在 -> 作者是当前用户 -> 文件格式支持 -> 上传
  test 'need sign in' do
    post api_blog_photos_url, params: {
      blogId: blogs(:success).id,
      file:   fixture_file_upload('/error_format_file.txt')
    }, headers:                       {
      'Accept': 'application/json'
    }
    assert_response :unauthorized
    assert_not_nil JSON.parse(@response.body)['error']
  end

  test 'blog not exists' do
    sign_in users(:success)
    post api_blog_photos_url, params: {
      blogId: 'not exists id',
      file:   fixture_file_upload('/error_format_file.txt')
    }, headers:                       {
      'Accept': 'application/json'
    }
    assert_response :not_found
    assert_equal JSON.parse(@response.body)['code'], Code::Resource_Not_Found
  end

  test 'blog not exists of current user' do
    sign_in users(:success)
    post api_blog_photos_url, params: {
      blogId: blogs(:other_blog),
      file:   fixture_file_upload('/error_format_file.txt')
    }, headers:                       {
      'Accept': 'application/json'
    }
    assert_response :not_found
    assert_equal JSON.parse(@response.body)['code'], Code::Resource_Not_Found
  end

  test 'file not support' do
    sign_in users(:success)
    post api_blog_photos_url, params: {
      blogId: blogs(:success).id,
      file:   fixture_file_upload('/error_format_file.txt')
    }, headers:                       {
      'Accept': 'application/json'
    }
    assert_response :bad_request
    assert_equal JSON.parse(@response.body)['code'], Code::Photo_Format_Not_Support
  end

  test 'success' do
    sign_in users(:success)
    post api_blog_photos_url, params: {
      blogId: blogs(:success).id,
      file:   fixture_file_upload('/test_file.png', 'image/png')
    }, headers:                       {
      'Accept': 'application/json'
    }
    assert_response :success
    assert_equal JSON.parse(@response.body)['code'], Code::Success
    assert_instance_of String, JSON.parse(@response.body)['data']['photoURL']
    assert_not_nil open(@photo_domain + JSON.parse(@response.body)['data']['photoURL'])
  end

  # travel_to Time.current - 8.days do; end

end
