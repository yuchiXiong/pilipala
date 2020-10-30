if @errors
  json.code Code::Success
  json.message 'success'
  json.data do
    json.errors @errors.messages.map { |key, val| "#{key}#{val}" }
  end
else
  json.code Code::Success
  json.message 'success'
end