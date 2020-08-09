if @errors
  json.code 400
  json.message @errors.full_messages
  json.data nil
else
  json.code 0
  json.message 'success'
  json.data do
    json.blog @blog.to_builder.target!
  end
end