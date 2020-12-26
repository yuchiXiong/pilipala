class AddIsAdminToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :is_admin, :boolean, null: false, default: false, comment: '是否是管理员'
  end
end
