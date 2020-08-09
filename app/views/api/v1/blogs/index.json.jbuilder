json.code 0
json.message 'success'
json.data do
  json.blogs @blogs.map { |blog| blog.to_builder.attributes! }
end