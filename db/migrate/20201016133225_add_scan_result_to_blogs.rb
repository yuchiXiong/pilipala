class AddScanResultToBlogs < ActiveRecord::Migration[5.2]
  def change
    add_column :blogs, :scan_result, :integer
    add_index :blogs, :scan_result
  end
end
