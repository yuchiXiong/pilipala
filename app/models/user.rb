require 'bcrypt'
require 'jwt'

class User < ApplicationRecord
  include BCrypt
  has_many :blogs

  enum sex: [:'保密', :'男', :'女']

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def to_builder

    exp = Time.current.to_i + 7 * 24 * 3600
    exp_payload = {account: account, exp: exp}
    hmac_secret = '11111111111'

    Jbuilder.new do |user|
      user.nickName nick_name
      user.userToken JWT::encode(exp_payload, hmac_secret, 'HS256')
      user.(self, :id, :email, :avatar, :sex, :description)
    end
  end
end
