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

ActiveRecord::Schema.define(version: 2020_09_28_110611) do

  create_table "blogs", force: :cascade do |t|
    t.string "title", null: false
    t.text "description", default: ""
    t.text "content", default: ""
    t.string "cover"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "released", default: false
    t.datetime "discarded_at"
    t.index ["discarded_at"], name: "index_blogs_on_discarded_at"
    t.index ["title"], name: "index_blogs_on_title"
    t.index ["user_id"], name: "index_blogs_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "account", null: false
    t.string "password_hash", null: false
    t.text "nick_name", default: ""
    t.string "email"
    t.string "avatar"
    t.integer "sex", default: 0
    t.text "description", default: ""
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account"], name: "index_users_on_account", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
  end

end
