class AddReleasedToBlogs < ActiveRecord::Migration[5.2]
  def change
    add_column :blogs, :released, :boolean, default: false, comment: '博客发布状态'
  end
end
