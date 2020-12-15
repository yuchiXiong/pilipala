json.code Code::Success
json.message 'SUCCESS'
json.data do
  json.blog do
    json.(@blog, :id, :title, :description, :content, :cover, :released)
    json.user @blog.user_id
    json.createdAt @blog.created_at
  end
end