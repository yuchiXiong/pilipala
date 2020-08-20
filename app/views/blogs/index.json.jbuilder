json.code Code::Success
json.message 'success'
json.data do
  json.blogs do
    json.array! @blogs do |blog|
      json.(blog, :id, :title, :description, :content, :cover)
      json.user blog.user_id
      json.createdAt blog.created_at
    end
  end
end