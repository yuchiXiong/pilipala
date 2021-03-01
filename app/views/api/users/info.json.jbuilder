json.code Code::Success
json.message 'Success'
json.data do
  json.user do
    json.key_format! camelize: :lower
    json.(current_user, :nick_name, :email, :sex, :description, :space_name)
    json.avatar current_user.oss_avatar
  end
end