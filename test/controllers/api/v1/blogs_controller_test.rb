require 'test_helper'

class BlogsControllerTest < ActionDispatch::IntegrationTest

  # * 登录
  setup do
    post api_v1_sessions_url, params: {
        account: users(:success).account,
        password: '123456'
    }
    @user_token = JSON.parse(@response.body)['data']['user']['userToken']
  end

  # * Get /api/v1/blogs
  # * 拉取博客列表
  # * 1. 应该拉取博客列表
  test 'should get blog list' do
    get api_v1_blogs_url, params: {
        page: 1
    }
    assert_response :success
    assert_equal JSON.parse(@response.body)['message'], 'success'
    assert_instance_of Array, JSON.parse(@response.body)['data']['blogs']
  end


  # * Get /api/v1/blogs/:id
  # * 拉取指定博客
  # * 1. 应该拉取指定博客
  # * 2. 指定博客不存在时应该提示不存在
  test 'should get blog' do
    get api_v1_blog_url(blogs(:success).id)
    assert_response :success
    assert_equal JSON.parse(@response.body)['message'], 'success'
    assert_not_nil JSON.parse(@response.body)['data']['blog']
  end

  test 'blog not found so not show' do
    get api_v1_blog_url('not_present_id')
    assert_response :not_found
    assert_equal JSON.parse(@response.body)['message'], '资源未找到'
  end


  # * Post /api/v1/blogs
  # * 创建博客
  # * 1. 应该创建blog
  # * 2. 未登录时应该提示未登录
  # * 3. 登录状态超时时应该提示过期
  # * 4. 创建的新博客作者是当前用户
  test 'should create blog' do
    blogs_count = Blog.count
    post api_v1_blogs_url, params: {
        blog: {
            title: '写好测试至少没那么多bug',
            description: '只是为了让自己少点事',
            content: '每次都打开swagger或者postman我也会很烦的'
        }
    }, headers: {
        'User-Token': @user_token
    }
    assert_response :success
    assert_equal JSON.parse(@response.body)['message'], 'success'
    assert_not_nil JSON.parse(@response.body)['data']['blog']
    assert_equal blogs_count + 1, Blog.count
  end

  test 'should need login' do
    post api_v1_blogs_url, params: {
        blog: {
            title: '写好测试至少没那么多bug',
            description: '只是为了让自己少点事',
            content: '每次都打开swagger或者postman我也会很烦的',
            user_id: 1
        }
    }
    assert_response :unauthorized
    assert_equal JSON.parse(@response.body)['code'], Code::Unauthorized_Error
  end

  test 'should login state timeout' do
    post api_v1_blogs_url, params: {
        blog: {
            title: '写好测试至少没那么多bug',
            description: '只是为了让自己少点事',
            content: '每次都打开swagger或者postman我也会很烦的',
            user_id: 1
        }
    }, headers: {
        'User-Token': @user_token
    }
    assert_response :unauthorized
    assert_equal JSON.parse(@response.body)['code'], Code::Unauthorized_Expired
  end

  test 'should blog author is current user' do
    post api_v1_blogs_url, params: {
        blog: {
            title: '写好测试至少没那么多bug',
            description: '只是为了让自己少点事',
            content: '每次都打开swagger或者postman我也会很烦的',
            user_id: 1
        }
    }, headers: {
        'User-Token': @user_token
    }
    assert_response :success
    assert_equal Blog.find(JSON.parse(@response.body)['data']['blog']['id']).user.account, users(:success).account
  end


  # * Delete /api/v1/blogs/:id
  # * 删除指定博客
  # * 1. 应该删除指定的博客
  # * 2. 指定博客不存在应该提示
  # * 3. 未登录时提示登录
  # * 4. 登录状态超时时应该提示过期
  test 'should delete blog' do
    current_blog_id = blogs(:success).id
    delete api_v1_blog_url(current_blog_id), headers: {'User-Token': @user_token}
    assert_response :success
    assert_equal JSON.parse(@response.body)['message'], 'success'
    assert_nil Blog.find_by(id: current_blog_id)
  end

  test 'blog not found so not delete' do
    blogs_count = Blog.count
    delete api_v1_blog_url('blog_not_present'), headers: {'User-Token': @user_token}
    assert_response :not_found
    assert_equal JSON.parse(@response.body)['message'], '资源未找到'
    assert_equal blogs_count, Blog.count
  end

  test 'show need login' do
    current_blog_id = blogs(:success).id
    delete api_v1_blog_url(current_blog_id)
    assert_response :unauthorized
    assert_equal Code::Unauthorized_Error, JSON.parse(@response.body)['code']
  end

  test 'show login state expired' do
    current_blog_id = blogs(:success).id
    delete api_v1_blog_url(current_blog_id), headers: {'User-Token': @user_token}
    assert_response :unauthorized
    assert_equal Code::Unauthorized_Expired, JSON.parse(@response.body)['code']
  end

end
