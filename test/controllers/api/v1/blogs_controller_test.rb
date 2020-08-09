require 'test_helper'

class BlogsControllerTest < ActionDispatch::IntegrationTest

  test 'should get blog list' do
    get api_v1_blogs_url, params: {
        page: 1
    }
    assert_response :success
    assert_equal JSON.parse(@response.body)['message'], 'success'
    assert_instance_of Array, JSON.parse(@response.body)['data']['blogs']
  end

  test 'should create blog' do
    blogs_count = Blog.count
    post api_v1_blogs_url, params: {
        blog: {
            title: '写好测试至少没那么多bug',
            description: '只是为了让自己少点事',
            content: '每次都打开swagger或者postman我也会很烦的',
            user_id: 1
        }
    }
    assert_response :success
    assert_equal JSON.parse(@response.body)['message'], 'success'
    assert_not_nil JSON.parse(@response.body)['data']['blog']
    assert_equal blogs_count + 1, Blog.count
  end

  test 'should return user must exist' do
    blogs_count = Blog.count
    post api_v1_blogs_url, params: {
        blog: {
            title: '写好测试至少没那么多bug',
            description: '只是为了让自己少点事',
            content: '每次都打开swagger或者postman我也会很烦的',
            user_id: 'user_not_present'
        }
    }
    assert_response :success
    assert_equal JSON.parse(@response.body)['message'], ['User must exist']
    assert_equal JSON.parse(@response.body)['data'], nil
    assert_equal blogs_count, Blog.count
  end

  test 'should get blog' do
    get api_v1_blog_url(blogs(:success).id)
    assert_response :success
    assert_equal JSON.parse(@response.body)['message'], 'success'
    assert_not_nil JSON.parse(@response.body)['data']['blog']
  end

  test 'shouldn\'t get blog' do
    get api_v1_blog_url('not_present_id')
    assert_response :success
    assert_equal JSON.parse(@response.body)['message'], '资源未找到'
    assert_equal JSON.parse(@response.body)['data'], {}
  end

  test 'should delete blog' do
    blogs_count = Blog.count
    delete api_v1_blog_url(blogs(:success).id)
    assert_response :success
    assert_equal JSON.parse(@response.body)['message'], 'success'
    assert_equal blogs_count - 1, Blog.count
  end

  test 'shouldn\'t delete blog' do
    blogs_count = Blog.count
    delete api_v1_blog_url('blog_not_present')
    assert_response :success
    assert_equal JSON.parse(@response.body)['message'], '资源未找到'
    assert_equal blogs_count, Blog.count
  end

end
