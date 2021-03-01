if @errors
  json.code Code::SERVER_ERROR
  json.message 'server error'
  json.data do
    json.errors @errors.messages.map { |key, val| "#{key}#{val}" }
  end
else
  json.code Code::SUCCESS
  json.message 'SUCCESS'
  json.data do
    json.blog do
      json.(@blog, :id, :title, :description, :content, :cover, :released)
      json.user @blog.user_id
      json.createdAt @blog.created_at
    end
  end
end