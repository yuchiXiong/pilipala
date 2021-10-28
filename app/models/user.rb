require 'ali/oss'

class User < ApplicationRecord
  mount_uploader :avatar, AvatarUploader

  has_many :blogs, dependent: :destroy, counter_cache: true
  has_many :comments
  action_store :read, :blog, counter_cache: true
  action_store :like, :blog, counter_cache: true
  action_store :follow, :user, counter_cache: 'followers_count', user_counter_cache: 'following_count'

  enum sex: %i[保密 男 女]

  class NullPassWordError < StandardError; end

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

  def update(record)
    self.password = record[:password] unless record[:password].nil?
    record.except!(:password).merge!(encrypted_password: encrypted_password)
    super
  end

  def update!(record)
    self.password = record[:password] unless record[:password].nil?
    record.except!(:password).merge!(encrypted_password: encrypted_password)
    super
  end

  def valid_password?(password)
    BCrypt::Engine.hash_secret(password, encrypted_password[0, 29].to_str) == encrypted_password
  end

  def password=(password)
    self.encrypted_password = BCrypt::Engine.hash_secret(password, BCrypt::Engine.generate_salt(BCrypt::Engine.cost))
  end

  def password
    encrypted_password
  end

  def self.create(record)
    return if record[:password].nil?
    record.except!(:password).merge!(encrypted_password: encrypted_password)
    super
  end

  def self.create!(record)
    raise NullPassWordError if record[:password].nil?
    record.except!(:password).merge!(encrypted_password: encrypted_password)
    super
  end

end
