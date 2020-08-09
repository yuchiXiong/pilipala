class ApiController < ActionController::API

  rescue_from(ActiveRecord::RecordNotFound) do
    render json: {
        code: 404,
        message: '资源未找到',
        data: {}
    }
  end

end
