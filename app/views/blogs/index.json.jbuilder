json.code Code::Success
json.message 'success'
json.data do
  json.blogs do
    json.array! @blogs do |blog|
      json.(blog, :id, :title, :description, :cover)
      json.user blog.user_id
      json.createdAt blog.created_at
    end
  end
  json.total do
    json.count Blog.count
    json.current @page.to_i <= 0 ? 1 : @page
  end
end