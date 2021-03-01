if @errors
  json.code Code::SUCCESS
  json.message 'SUCCESS'
  json.data do
    json.errors @errors.messages.map { |key, val| "#{key}#{val}" }
  end
else
  json.code Code::SUCCESS
  json.message 'SUCCESS'
end