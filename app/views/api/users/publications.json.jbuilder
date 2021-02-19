json.code Code::Success
json.message 'success'
json.data do
  json.blogs do
    json.array! @blogs do |blog|
      json.key_format! camelize: :lower
      json.(blog, :id, :title, :content, :created_at, :updated_at, :reads_count, :likes_count, :comments_count)
      json.user blog.user.to_json
    end

  end
end