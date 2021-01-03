class AddBlogsCountToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :blogs_count, :integer, default: 0, comment: '用户博客数量'
  end
end
