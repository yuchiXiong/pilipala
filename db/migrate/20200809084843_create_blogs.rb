class CreateBlogs < ActiveRecord::Migration[5.2]
  def change
    create_table :blogs, comment: '博客表' do |t|
      t.string :title, comment: '标题', null: false
      t.text :description, comment: '描述', default: ''
      t.text :content, comment: '内容', default: ''
      t.string :cover, comment: '封面'
      t.integer :user_id, comment: '作者id', null: false

      t.timestamps
    end
    add_index :blogs, :title
    add_index :blogs, :user_id
  end
end
