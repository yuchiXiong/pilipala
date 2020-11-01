class WelcomeController < ApplicationController
  skip_before_action :authenticate_user!

  def not_found
    render template: 'not_found/show'
  end
end