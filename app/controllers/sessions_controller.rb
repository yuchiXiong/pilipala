class SessionsController < ApplicationController

  # * POST /sessions
  def create
    account = params[:account]
    password = params[:password]
    @user   = User.find_by_account(account)
    unless @user && @user.password == password
      raise AccountValidError
    end
  end

end