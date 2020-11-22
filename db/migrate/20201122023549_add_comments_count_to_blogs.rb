class AddCommentsCountToBlogs < ActiveRecord::Migration[5.2]
  def change
    add_column :blogs, :comments_count, :integer, default: 0, comment: '评论总数缓存'
  end
end
