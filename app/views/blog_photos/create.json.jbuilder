json.code Code::Success
json.message 'success'
json.data do
  json.blogId @blog.id
  json.photoURL @url
end