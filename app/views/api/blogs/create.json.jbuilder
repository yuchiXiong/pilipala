if @errors
  json.code Code::Server_Error
  json.message 'server error'
  json.data do
    json.errors @errors.messages.map { |key, val| "#{key}#{val}" }
  end
else
  json.code Code::Success
  json.message 'success'
  json.data do
    json.blog do
      json.call(@blog, :id, :title, :description, :content, :cover, :released)
      json.user @blog.user_id
      json.createdAt @blog.created_at
    end
  end
end