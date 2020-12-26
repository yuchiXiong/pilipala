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

ActiveRecord::Schema.define(version: 2020_12_26_060419) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "actions", force: :cascade do |t|
    t.string "action_type", null: false
    t.string "action_option"
    t.string "target_type"
    t.bigint "target_id"
    t.string "user_type"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["action_type", "target_type", "target_id", "user_type", "user_id"], name: "uk_action_target_user", unique: true
    t.index ["target_type", "target_id", "action_type"], name: "index_actions_on_target_type_and_target_id_and_action_type"
    t.index ["user_type", "user_id", "action_type"], name: "index_actions_on_user_type_and_user_id_and_action_type"
  end

  create_table "blogs", comment: "博客表", force: :cascade do |t|
    t.string "title", null: false, comment: "标题"
    t.text "description", default: "", comment: "描述"
    t.text "content", default: "", comment: "内容"
    t.string "cover", comment: "封面"
    t.integer "user_id", null: false, comment: "作者id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "released", default: false, comment: "博客发布状态"
    t.datetime "discarded_at"
    t.integer "scan_result"
    t.integer "reads_count", default: 0
    t.integer "likes_count", default: 0
    t.integer "comments_count", default: 0, comment: "评论总数缓存"
    t.index ["discarded_at"], name: "index_blogs_on_discarded_at"
    t.index ["scan_result"], name: "index_blogs_on_scan_result"
    t.index ["title"], name: "index_blogs_on_title"
    t.index ["user_id"], name: "index_blogs_on_user_id"
  end

  create_table "comments", force: :cascade do |t|
    t.text "content"
    t.integer "user_id"
    t.integer "blog_id"
    t.bigint "comment_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["comment_id"], name: "index_comments_on_comment_id"
  end

  create_table "users", comment: "用户表", force: :cascade do |t|
    t.string "nick_name", default: "SmallBookdbe09d14", comment: "昵称"
    t.string "email", comment: "[废弃]邮箱"
    t.string "avatar", comment: "头像"
    t.integer "sex", default: 0, comment: "性别"
    t.text "description", default: "", comment: "简介"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.boolean "is_admin", default: false, null: false, comment: "是否是管理员"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
