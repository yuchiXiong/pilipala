class AddSpaceNameToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :space_name, :string
    add_index :users, :space_name, unique: true
  end
end
