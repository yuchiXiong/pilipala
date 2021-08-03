require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module YuchiXiongTopRails
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    # * 关闭视图层在表单提交失败后自动将类名替换为异常样式
    config.action_view.field_error_proc = Proc.new { |html_tag, instance|
      html_tag.html_safe
    }

    config.action_mailer.delivery_method = :smtp
    config.action_mailer.smtp_settings = {
        address: 'smtpdm.aliyun.com',
        port: 465,
        domain: 'example.com',
        # user_name:            Rails.application.credentials[:ali][:mail],
        # password:             Rails.application.credentials[:ali][:password],
        authentication: 'plain',
        enable_starttls_auto: true,
        ssl: true
    }

    config.i18n.default_locale = "zh-CN"

    config.load_defaults 5.2
    config.after_initialize do
      %w(table th tr td).each do |tag|
        ActionView::Base.sanitized_allowed_tags.add(tag)
      end
    end

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
  end
end
