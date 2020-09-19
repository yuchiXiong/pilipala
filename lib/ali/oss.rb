require 'aliyun/oss'

module Ali
  class Oss

    END_POINT         = 'oss-cn-beijing.aliyuncs.com'.freeze
    ACCESS_KEY_ID     = Rails.application.credentials[:ali][:access_key_id]
    ACCESS_KEY_SECRET = Rails.application.credentials[:ali][:access_key_secret]

    attr_reader :client

    def initialize
      @client = Aliyun::OSS::Client.new(
        endpoint:          END_POINT,
        access_key_id:     ACCESS_KEY_ID,
        access_key_secret: ACCESS_KEY_SECRET)
    end

  end
end
