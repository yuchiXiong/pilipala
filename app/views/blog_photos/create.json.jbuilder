json.code Code::Success
json.message 'success'
json.data do
  json.blogId params[:id]
  json.photoURL @url
end