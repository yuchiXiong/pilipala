# frozen_string_literal: true
class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users, comment: '用户表' do |t|
      t.string :account, comment: '[废弃]用户名', null: false
      t.string :password_hash, comment: '[废弃]密码密文', null: false
      t.text :nick_name, comment: '昵称', default: ''
      t.string :email, comment: '[废弃]邮箱'
      t.string :avatar, comment: '头像'
      t.integer :sex, comment: '性别', default: 0
      t.text :description, comment: '简介', default: ''

      t.timestamps
    end
    add_index :users, :account, unique: true
    add_index :users, :email, unique: true
  end
end
