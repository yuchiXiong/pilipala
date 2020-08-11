# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_08_09_084843) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "blogs", comment: "博客表", force: :cascade do |t|
    t.string "title", null: false, comment: "标题"
    t.text "description", default: "", comment: "描述"
    t.text "content", default: "", comment: "内容"
    t.string "cover", comment: "封面"
    t.integer "user_id", null: false, comment: "作者id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["title"], name: "index_blogs_on_title"
    t.index ["user_id"], name: "index_blogs_on_user_id"
  end

  create_table "users", comment: "用户表", force: :cascade do |t|
    t.string "account", null: false, comment: "用户名"
    t.string "password_hash", null: false, comment: "密码密文"
    t.text "nick_name", default: "", comment: "昵称"
    t.string "email", comment: "邮箱"
    t.string "avatar", comment: "头像"
    t.integer "sex", default: 0, comment: "性别"
    t.text "description", default: "", comment: "简介"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account"], name: "index_users_on_account", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
  end

end
