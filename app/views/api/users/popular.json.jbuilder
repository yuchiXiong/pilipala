json.code Code::Success
json.message 'Success'
json.data do
  json.authors do
    json.array! @authors do |user|
      json.key_format! camelize: :lower
      json.(user, :id, :nick_name, :email, :sex, :description,
        :created_at, :updated_at, :is_admin, :blogs_count,
        :followers_count, :following_count, :space_name)
      json.avatar user.oss_avatar
    end
  end
end