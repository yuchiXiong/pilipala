class AddFollowsCountToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :followers_count, :integer, default: 0, comment: '被关注数'
    add_column :users, :following_count, :integer, default: 0, comment: '关注数'
  end
end
