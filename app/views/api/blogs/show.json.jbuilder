json.code Code::Success
json.message 'SUCCESS'
json.data do
  json.blog do
    json.key_format! camelize: :lower
    json.(@blog, :id, :title, :description, :content, :cover, :released, :reads_count, :likes_count,
      :comments_count, :created_at)
    json.user @blog.user.to_json
  end
end