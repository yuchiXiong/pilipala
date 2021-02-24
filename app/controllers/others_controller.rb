class OthersController < ApplicationController
  # skip_before_action :authenticate_user!
  layout 'other'

  def index
    gon.currentUser = current_user ? current_user.to_json : nil
  end
end