class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.text :content
      t.integer :user_id
      t.integer :blog_id
      t.references :comment, index: true

      t.timestamps
    end
  end
end
