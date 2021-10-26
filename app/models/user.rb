require 'ali/oss'

class User < ApplicationRecord
  mount_uploader :avatar, AvatarUploader
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # devise :database_authenticatable, :registerable,
  #        :recoverable, :rememberable, :validatable

  has_many :blogs, dependent: :destroy, counter_cache: true
  has_many :comments
  action_store :read, :blog, counter_cache: true
  action_store :like, :blog, counter_cache: true
  action_store :follow, :user, counter_cache: 'followers_count', user_counter_cache: 'following_count'

  enum sex: %i[保密 男 女]

  def resource_errors
    errors.full_messages
  end

  def oss_avatar
    if avatar.file.nil?
      # 'https://assets-blog-xiongyuchi.oss-cn-beijing.aliyuncs.com/avatars/dog.jpg'
      'https://assets.bubuyu.top/avatars/dog.jpg'
    else
      # "https://assets-blog-xiongyuchi.oss-cn-beijing.aliyuncs.com#{avatar.url}"
      "https://assets.bubuyu.top#{avatar.url}"
    end
  end

  def valid_password?(password)
    BCrypt::Engine.hash_secret(password, encrypted_password[0, 29].to_str) == encrypted_password
  end
  
  def update_password(password)
    self.encrypted_password = BCrypt::Engine.hash_secret(password, BCrypt::Engine.generate_salt(BCrypt::Engine.cost))
    self.save
  end

end
