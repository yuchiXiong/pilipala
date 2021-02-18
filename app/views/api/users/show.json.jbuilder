json.code Code::Success
json.message 'Success'
json.data do
  json.user do
    json.key_format! camelize: :lower
    json.(@be_visited_user, :id, :nick_name, :email, :sex, :description,
      :blogs_count, :followers_count, :space_name)
    json.avatar @be_visited_user.oss_avatar
  end
end