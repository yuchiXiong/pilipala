class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users, comment: '用户表' do |t|
      t.string :account, comment: '用户名'
      t.string :password_hash, comment: '密码密文'
      t.text :nick_name, comment: '昵称'
      t.string :email, comment: '邮箱'
      t.string :avatar, comment: '头像'
      t.integer :sex, comment: '性别'
      t.text :description, comment: '简介'

      t.timestamps
    end
    add_index :users, :account, unique: true
    add_index :users, :email, unique: true
  end
end
