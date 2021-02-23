json.code Code::Success
json.message 'success'
json.data do
  json.comments do
    json.array! @comments do |comment|
      json.key_format! camelize: :lower
      json.call(comment, :id, :content, :created_at, :comment_id)
      json.user comment.user.to_json
    end
  end
end
