class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :blog, counter_cache: true
  # * 通过自联结将评论与子评论存储在同一张数据表中
  has_many :sub_comments, class_name: 'Comment', foreign_key: 'comment_id'
  default_scope -> { order(created_at: :desc) }

  def to_json
    Jbuilder.new do |json|
      json.key_format! camelize: :lower
      json.(self, :id, :content, :blog_id, :comment_id, :created_at, :updated_at)
      json.user user.to_json
    end.attributes!
  end
end
