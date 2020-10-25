require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module YuchiXiongTopRails
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.

    config.action_mailer.delivery_method     = :smtp
    config.action_mailer.smtp_settings       = {
      address:              'smtpdm.aliyun.com',
      port:                 465,
      domain:               'example.com',
      user_name:            Rails.application.credentials[:ali][:mail],
      password:             Rails.application.credentials[:ali][:password],
      authentication:       'plain',
      enable_starttls_auto: true,
      ssl:                  true
    }


    config.load_defaults 5.2
    config.after_initialize do
      %w(table th tr td).each do |tag|
        ActionView::Base.sanitized_allowed_tags.add(tag)
      end
    end

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
  end
end
