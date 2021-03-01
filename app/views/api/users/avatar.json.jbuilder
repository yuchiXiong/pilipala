json.code Code::SUCCESS
json.message 'SUCCESS'
json.data do
  json.user do
    json.avatar current_user.oss_avatar
  end
end