json.code Code::Success
json.message 'success'
json.data do
  json.blogs do
    json.array! @blogs do |blog|
      json.(blog, :id, :title, :description, :cover)
      json.user blog.user_id
      # ? 首页拉取所有的文章呢？
      # json.content blog.content[0..200]
      json.content blog.content
      json.createdAt blog.created_at
    end
  end
  json.total do
    json.count @all_released_blogs.count
    json.current @page.to_i <= 0 ? 1 : @page
  end
end