require 'bcrypt'
require 'jwt'

class User < ApplicationRecord
  include BCrypt
  has_many :blogs

  enum sex: %i[保密 男 女]

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def self.user_valid!(user_token)
    hmac_secret = Rails.application.credentials[:jwt_hmac_secret]
    decode = JWT.decode user_token, hmac_secret, true, {algorithm: 'HS256'}
    User.find_by_account(decode[0]['account'])
  end

  def jwt
    # * 登录有效期 7 天
    exp = Time.current.to_i + 7 * 24 * 3600
    exp_payload = {account: account, exp: exp}
    hmac_secret = Rails.application.credentials[:jwt_hmac_secret]
    JWT::encode(exp_payload, hmac_secret, 'HS256')
  end

end
