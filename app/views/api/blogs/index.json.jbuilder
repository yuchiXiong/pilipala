json.code Code::Success
json.message 'SUCCESS'
json.data do
  json.blogs do
    json.array! @blogs do |blog|
      json.key_format! camelize: :lower
      json.(blog, :id, :title, :description, :reads_count, :likes_count, :comments_count, :created_at)
      json.content blog.content.truncate(288)
      json.cover blog.oss_cover
      json.user blog.user.to_json
    end
  end
end