require 'ali/oss'

class User < ApplicationRecord
  mount_uploader :avatar, AvatarUploader

  has_many :blogs, dependent: :destroy, counter_cache: true
  has_many :comments
  action_store :read, :blog, counter_cache: true
  action_store :like, :blog, counter_cache: true
  action_store :follow, :user, counter_cache: 'followers_count', user_counter_cache: 'following_count'

  enum sex: %i[保密 男 女]

  has_secure_password

  def oss_avatar
    if avatar.file.nil?
      # 'https://assets-blog-xiongyuchi.oss-cn-beijing.aliyuncs.com/avatars/dog.jpg'
      'https://assets.bubuyu.top/avatars/dog.jpg'
    else
      # "https://assets-blog-xiongyuchi.oss-cn-beijing.aliyuncs.com#{avatar.url}"
      "https://assets.bubuyu.top#{avatar.url}"
    end
  end

end
