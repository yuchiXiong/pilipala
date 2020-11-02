# frozen_string_literal: true

require 'test_helper'

class BlogsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @test_blog = {
      title:       '写好测试至少没那么多bug',
      description: '只是为了让自己少点事',
      content:     '每次都打开swagger或者postman我也会很烦的',
      cover:       '',
      released:    true
    }
  end

  # * [HTML] Get /blogs or /
  # * 拉取博客列表: 分页拉取所有处于 [已发布未弃用] 的博客
  # * 1. 拉取处于 [已发布未弃用] 的博客列表
  # * 2. 分页加载
  test 'pull released and kept blogs list' do
    get blogs_url, params: { page: 1 }
    assert_response :success
    assert_select '.blogs .blog-post > a', 10
    assert_select '.blogs .blog-post > a' do |elements|
      ids = elements.map do |e|
        e['href'][e['href'].rindex('/') + 1..-1]
      end
      assert_equal Blog.where(id: ids).visible.count, 10
    end
  end

  test 'next page' do
    counter = 0
    4.times do |page|
      get blogs_url, params: { page: page + 1 }
      assert_response :success
      assert_select '.blogs .blog-post > a' do |elements|
        counter += elements.size
      end
    end
    assert_equal Blog.visible.count, counter
  end

  # * [HTML] Get blogs/:id
  # * 拉取指定博客: 拉取指定id的博客
  # * 1. 博客不存在
  # * 2. 博客存在 -> 未发布
  # * 3. 博客存在 -> 已标记为删除
  # * 3. 博客存在 -> 可读 -> 成功
  test 'blog not exists' do
    get blog_url('not exists')
    assert_response :not_found
  end

  test 'blog not release' do
    get blog_url(blogs(:not_released_blog).id)
    assert_response :not_found
    assert_equal blogs(:not_released_blog).released, false
  end

  test 'blog discard' do
    get blog_url(blogs(:discard_blog).id)
    assert_response :not_found
    assert_not_nil blogs(:discard_blog).discarded_at
  end

  test 'show blog' do
    get blog_url(blogs(:success).id)
    assert_response :success
    assert_nil blogs(:success).discarded_at
    assert_equal blogs(:success).released, true
    assert_select '.blog_title > h1', blogs(:success).title
  end

  # * [JSON] Post /blogs
  # * 创建博客
  # * 1. 未登录
  # * 2. 登陆 -> 什么都没传
  # * 3. 登陆 -> 标题/内容
  test 'need login before create blog' do
    count = Blog.count
    post api_blogs_url, params: {
      blog: {}
    }
    assert_response :redirect
    assert_select 'a' do |element|
      assert_equal element[0]['href'], new_user_session_url
    end
    assert_equal count, Blog.count
  end

  test 'need params before create blog' do
    count = Blog.count
    sign_in users(:success)
    post api_blogs_url, params: {
      format: 'application/json',
    }
    assert_response :bad_request
    assert_equal JSON.parse(@response.body)['code'], Code::Parameter_Missing
    assert_equal count, Blog.count
  end

  test 'create blog' do
    blogs_count = Blog.count
    sign_in users(:success)
    post api_blogs_url, params: {
      format: 'application/json',
      blog:   @test_blog
    }
    assert_response :success
    assert_equal JSON.parse(@response.body)['message'], 'success'
    assert_not_nil JSON.parse(@response.body)['data']['blog']
    assert_equal blogs_count + 1, Blog.count
    assert_equal Blog.first.title, @test_blog[:title]
    assert_equal Blog.first.description, @test_blog[:description]
    assert_equal Blog.first.content, @test_blog[:content]
    assert_equal Blog.first.user.id, users(:success).id
  end

  # * [JSON] Delete /blogs/:id
  # * 删除指定博客: 将指定id的博客标记为删除
  # * 1. 未登录
  # * 2. 登录 -> 指定的文章不存在
  # * 3. 登录 -> 指定的文章存在 -> 文章作者不是当前用户
  # * 4. 登录 -> 指定的文章存在 -> 文章作者是当前用户
  test 'need login before delete blog' do
    delete api_blog_url(users(:success).id)
    assert_response :redirect
    assert_select 'a' do |e|
      assert_equal e[0]['href'], new_user_session_url
    end
  end

  test 'can not delete because blog not exists' do
    sign_in users(:success)
    delete api_blog_url('not exists')
    assert_response :not_found
    assert_equal JSON.parse(@response.body)['code'], Code::Resource_Not_Found
  end

  test 'can not delete because blog author is not current user' do
    count = Blog.kept.count
    sign_in users(:success)
    delete api_blog_url(blogs(:other_blog))
    assert_response :forbidden
    assert_equal JSON.parse(@response.body)['code'], Code::Access_Denied
    assert_equal count, Blog.kept.count
  end

  test 'delete blog' do
    count = Blog.kept.count
    sign_in users(:success)
    delete api_blog_url(blogs(:success)), params: {
      format: 'application/json'
    }
    assert_response :success
    assert_equal JSON.parse(@response.body)['code'], Code::Success
    assert_equal count - 1, Blog.kept.count
  end

  # * [JSON] PUT/PATCH /blogs/:id
  # * 修改指定博客: 修改指定id的博客
  # * 1. 未登录
  # * 2. 登录 -> 指定的博客不存在
  # * 3. 登录 -> 指定的博客存在 -> 文章作者不是当前用户
  # * 4. 登录 -> 指定的博客存在 -> 文章作者是当前用户 -> 无参数
  # * 5. 修改
  test 'need login before update' do
    patch api_blog_url(blogs(:success).id), params: {}
    assert_response :redirect
    assert_select 'a' do |element|
      assert_equal element[0]['href'], new_user_session_url
    end
  end

  test 'can not update because blog not exists' do
    sign_in users(:success)
    patch api_blog_url('not exists'), params: {}
    assert_response :not_found
    assert_equal JSON.parse(@response.body)['code'], Code::Resource_Not_Found
  end

  test 'can not update because blog author is not current user' do
    sign_in users(:success)
    patch api_blog_url(blogs(:other_blog).id), params: {}
    assert_response :forbidden
    assert_equal JSON.parse(@response.body)['code'], Code::Access_Denied
  end

  test 'can not update because params missing' do
    blog = Blog.find(blogs(:success).id)
    sign_in users(:success)
    patch api_blog_url(blogs(:success).id), params: {}
    assert_response :bad_request
    assert_equal JSON.parse(@response.body)['code'], Code::Parameter_Missing
    assert_equal blog.title, Blog.find(blogs(:success).id).title
    assert_equal blog.content, Blog.find(blogs(:success).id).content
    assert_equal blog.description, Blog.find(blogs(:success).id).description
    assert_equal blog.cover, Blog.find(blogs(:success).id).cover
    assert_equal blog.released, Blog.find(blogs(:success).id).released
  end

  test 'update blog' do
    sign_in users(:success)
    patch api_blog_url(blogs(:success).id), params: {
      format: 'application/json',
      blog:   @test_blog
    }
    assert_response :success
    assert_equal JSON.parse(@response.body)['code'], Code::Success
    assert_equal @test_blog[:title], Blog.find(blogs(:success).id).title
    assert_equal @test_blog[:content], Blog.find(blogs(:success).id).content
    assert_equal @test_blog[:description], Blog.find(blogs(:success).id).description
    assert_equal @test_blog[:cover], Blog.find(blogs(:success).id).cover
    assert_equal @test_blog[:released], Blog.find(blogs(:success).id).released
  end

end
