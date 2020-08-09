if @user
  json.code 0
  json.message 'success'
  json.data do
    json.user @user.to_builder.target!
  end
else
  json.code 0
  json.message '用户名与密码不匹配'
  json.data nil
end