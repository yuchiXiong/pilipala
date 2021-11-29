class Account::SessionsController < AccountController

  # GET /sign_in
  def new

  end

  # POST /sign_in
  def create
    u = User.find_by_email(params[:email])

    if u && u.authenticate(params[:password])
      sessions[:current_user] = u
      respond_to do |format|
        format.any {
          redirect_to params[:redirect_to]
        }
      end
    else
      respond_to do |format|
        format.json { render json: { msg: 'not match' }, status: :unauthorized }
        format.any { render json: '<p>any</p>', status: :unauthorized }
      end
    end

  end
end