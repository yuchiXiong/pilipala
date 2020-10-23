require 'aliyunsdkcore'

module Ali
  class ContentScan

    END_POINT         = 'https://imageaudit.cn-shanghai.aliyuncs.com'.freeze
    API_VERSION       = '2019-12-30'
    ACCESS_KEY_ID     = Rails.application.credentials[:ali][:access_key_id]
    ACCESS_KEY_SECRET = Rails.application.credentials[:ali][:access_key_secret]

    attr_reader :client

    def initialize
      @client = RPCClient.new(
        access_key_id:     ACCESS_KEY_ID,
        access_key_secret: ACCESS_KEY_SECRET,
        endpoint:          END_POINT,
        api_version:       API_VERSION
      )
    end

    def scan_text(content)
      response = @client.request(
        action: 'ScanText',
        params: {
          "RegionId":        "cn-shanghai",
          "Tasks.1.Content": content,
          # * 文字垃圾内容识别
          "Labels.1.Label": "spam",
          # * 文字垃圾内容识别
          "Labels.2.Label": "politics",
          # * 文字垃圾内容识别
          "Labels.3.Label": "abuse",
          # * 文字涉恐内容识别
          "Labels.4.Label": "terrorism",
          # * 文字鉴黄内容识别
          "Labels.5.Label": "porn",
          # * 文字灌水内容识别
          "Labels.6.Label": "flood",
          # * 文字灌水内容识别
          "Labels.7.Label": "contraband",
          # * 文字广告内容识别
          "Labels.8.Label": "ad"
        },
        opts:   {
          method: 'POST'
        }
      )
      response['Data']['Elements'][0]['Results'][0]['Suggestion']
    end
  end
end