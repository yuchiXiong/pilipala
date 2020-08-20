json.code Code::Success
json.message 'success'
json.data do
  json.user do
    json.(@user, :id, :email, :avatar, :sex, :description)
    json.userToken @user.jwt
    json.nickName @user.nick_name
  end
end