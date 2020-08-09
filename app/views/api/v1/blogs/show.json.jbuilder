json.code 0
json.message 'success'
json.data do
  json.blog @blog.to_builder.attributes!
end