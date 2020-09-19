# frozen_string_literal: true

require 'test_helper'

class BlogsControllerTest < ActionDispatch::IntegrationTest
  # * 部分接口需要先登录
  setup do
    post sessions_url, params: {
      account:  users(:success).account,
      password: '123456'
    }, headers:                { 'Accept': 'application/json' }
    @user_token = JSON.parse(@response.body)['data']['user']['userToken']
  end

  # * Get /blogs
  # * 拉取博客列表
  # * 1. 应该拉取博客列表
  test 'get blog list' do
    get blogs_url, params: {
      format: 'application/json',
      page:   1
    }, headers:            { 'Accept': 'application/json' }
    assert_response :success
    assert_equal JSON.parse(@response.body)['message'], 'success'
    assert_instance_of Array, JSON.parse(@response.body)['data']['blogs']
  end

  # * Get blogs/:id
  # * 拉取指定博客
  # * 1. 应该拉取指定博客
  # * 2. 指定博客不存在时应该提示不存在
  # * 3. 指定博客存在但未发布时提示不存在
  test 'get blog' do
    get blog_url(blogs(:success).id), headers: { 'Accept': 'application/json' }
    assert_response :success
    assert_equal JSON.parse(@response.body)['message'], 'success'
    assert_not_nil JSON.parse(@response.body)['data']['blog']
  end

  test 'return not found if blog not exist' do
    get blog_url('not_present_id'), headers: { 'Accept': 'application/json' }
    assert_response :not_found
    assert_equal JSON.parse(@response.body)['message'], '资源未找到'
  end

  test 'return not found if blog not released' do
    get blog_url(blogs(:released_blog).id), headers: { 'Accept': 'application/json' }
    assert_response :not_found
    assert_equal JSON.parse(@response.body)['message'], '资源未找到'
  end

  # * Post /blogs
  # * 创建博客
  # * 1. 应该创建blog
  # * 2. 未登录时应该提示未登录
  # * 3. 登录状态超时时应该提示过期
  # * 4. 创建的新博客作者是当前用户
  test 'should create blog' do
    blogs_count = Blog.count
    post blogs_url, params: {
      blog: {
        title:       '写好测试至少没那么多bug',
        description: '只是为了让自己少点事',
        content:     '每次都打开swagger或者postman我也会很烦的'
      }
    }, headers:             {
      'User-Token': @user_token,
      'Accept':     'application/json'
    }
    assert_response :success
    assert_equal JSON.parse(@response.body)['message'], 'success'
    assert_not_nil JSON.parse(@response.body)['data']['blog']
    assert_equal blogs_count + 1, Blog.count
  end

  test 'should need login' do
    post blogs_url, params: {
      blog: {
        title:       '写好测试至少没那么多bug',
        description: '只是为了让自己少点事',
        content:     '每次都打开swagger或者postman我也会很烦的',
        user_id:     1
      }
    }, headers:             {
      'Accept': 'application/json'
    }
    assert_response :unauthorized
    assert_equal JSON.parse(@response.body)['code'], Code::Unauthorized_Error
  end

  test 'should login state expired' do
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

    post blogs_url, params: {
      blog: {
        title:       '写好测试至少没那么多bug',
        description: '只是为了让自己少点事',
        content:     '每次都打开swagger或者postman我也会很烦的',
        user_id:     1
      }
    }, headers:             {
      'User-Token': user_token,
      'Accept':     'application/json'
    }

    assert_response :unauthorized
    assert_equal JSON.parse(@response.body)['code'], Code::Unauthorized_Expired
  end

  test 'should blog author is current user' do
    post blogs_url, params: {
      blog: {
        title:       '写好测试至少没那么多bug',
        description: '只是为了让自己少点事',
        content:     '每次都打开swagger或者postman我也会很烦的',
        user_id:     1
      }
    }, headers:             {
      'User-Token': @user_token,
      'Accept':     'application/json'
    }
    blog = Blog.find(JSON.parse(@response.body)['data']['blog']['id'])
    assert_response :success
    assert_equal blog.user.account, users(:success).account
  end

  # * Delete /blogs/:id
  # * 删除指定博客
  # * 1. 应该删除指定的博客
  # * 2. 指定博客不存在应该提示
  # * 3. 未登录时提示登录
  # * 4. 登录状态超时时应该提示过期
  test 'should delete blog' do
    current_blog_id = blogs(:success).id
    delete blog_url(current_blog_id), headers: {
      'User-Token': @user_token,
      'Accept':     'application/json'
    }
    assert_response :success
    assert_equal JSON.parse(@response.body)['message'], 'success'
    assert_nil Blog.find_by(id: current_blog_id)
  end

  test 'blog not found so not delete' do
    blogs_count = Blog.count
    delete blog_url('blog_not_present'), headers: {
      'User-Token': @user_token,
      'Accept':     'application/json'
    }
    assert_response :not_found
    assert_equal JSON.parse(@response.body)['message'], '资源未找到'
    assert_equal blogs_count, Blog.count
  end

  test 'show need login' do
    current_blog_id = blogs(:success).id
    delete blog_url(current_blog_id), headers: { 'Accept': 'application/json' }
    assert_response :unauthorized
    assert_equal Code::Unauthorized_Error, JSON.parse(@response.body)['code']
  end

  test 'show login state expired' do
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

    current_blog_id = blogs(:success).id
    delete blog_url(current_blog_id), headers: {
      'User-Token': user_token,
      'Accept':     'application/json'
    }
    assert_response :unauthorized
    assert_equal Code::Unauthorized_Expired, JSON.parse(@response.body)['code']
  end

  # * PUT/PATCH /blogs/:id
  # * 修改指定博客
  # * 1. 博客存在，且用户登录时修改博客
  # * 2. 博客不存在，用户登录时提示资源不存在
  # * 3. 博客存在，用户未登录时提是未登录
  # * 4. 博客存在，用户登录，但博客不属于当前用户提示无权进行修改
  test 'should update blog' do
    patch blog_url(blogs(:success).id), params: {
      blog: {
        title:    'updated title',
        released: true
      }
    }, headers:                                 {
      'Accept':     'application/json',
      'User-Token': @user_token
    }
    blog = Blog.find(blogs(:success).id)
    assert_response :success
    assert_equal blog.title, 'updated title'
    assert_equal blog.released, true
    assert_equal blog.content, blogs(:success).content
    assert_equal blog.cover, blogs(:success).cover
    assert_equal blog.user_id, blogs(:success).user_id
  end

  test 'return resources not found if blog not exist' do
    patch blog_url('not exist'), params: {
      blog: {
        title:    'updated title',
        released: true
      }
    }, headers:                          {
      'Accept':     'application/json',
      'User-Token': @user_token
    }
    assert_response :not_found
    assert_equal JSON.parse(@response.body)['message'], '资源未找到'
  end

  test 'return need login if user not login' do
    patch blog_url(blogs(:success).id), params: {
      blog: {
        title:    'updated title',
        released: true
      }
    }, headers:                                 {
      'Accept': 'application/json'
    }
    assert_response :unauthorized
    assert_equal JSON.parse(@response.body)['message'], '身份验证异常'
  end

  test 'return access denied if login user is not blog author' do
    patch blog_url(blogs(:other_blog).id), params: {
      blog: {
        title:    'updated title',
        released: true
      }
    }, headers:                                    {
      'Accept':     'application/json',
      'User-Token': @user_token
    }
    assert_response :forbidden
    assert_equal JSON.parse(@response.body)['message'], '无权访问！'
  end
end
