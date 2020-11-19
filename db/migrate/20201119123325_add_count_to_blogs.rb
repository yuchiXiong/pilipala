class AddCountToBlogs < ActiveRecord::Migration[5.2]
  def change
    add_column :blogs, :reads_count, :integer, default: 0
    add_column :blogs, :likes_count, :integer, default: 0
  end
end
