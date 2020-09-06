json.code Code::Success
json.message 'success'
json.data do
  json.blogs do
    json.array! @blogs do |blog|
      json.(blog, :id, :title, :content)
      json.userId blog.user_id
      json.createdAt blog.created_at
      json.updatedAt blog.updated_at
    end

  end
end