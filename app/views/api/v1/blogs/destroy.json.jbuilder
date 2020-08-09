if @errors
  json.code 500
  json.message @errors.full_messages
  json.data nil
else
  json.code 0
  json.message 'success'
  json.data nil
end