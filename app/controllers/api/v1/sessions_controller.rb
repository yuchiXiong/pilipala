module Api
  module V1
    class SessionsController < ApiController

      def create
        account = params[:account]
        password = params[:password]

        @user = User.find_by_account(account)
        unless @user && @user.password == password
          @user = nil
        end
      end

    end
  end
end