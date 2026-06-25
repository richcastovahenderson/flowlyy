# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_06_25_155703) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "categories", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "icon"
    t.string "name"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_categories_on_user_id"
  end

  create_table "recurrings", force: :cascade do |t|
    t.decimal "amount"
    t.bigint "category_id", null: false
    t.datetime "created_at", null: false
    t.integer "day_of_month"
    t.string "frequency"
    t.boolean "is_active"
    t.string "name"
    t.date "next_date"
    t.string "recurring_type"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["category_id"], name: "index_recurrings_on_category_id"
    t.index ["user_id"], name: "index_recurrings_on_user_id"
  end

  create_table "transactions", force: :cascade do |t|
    t.decimal "amount"
    t.bigint "category_id", null: false
    t.datetime "created_at", null: false
    t.date "date"
    t.boolean "is_recurring"
    t.string "notes"
    t.string "transaction_type"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["category_id"], name: "index_transactions_on_category_id"
    t.index ["user_id"], name: "index_transactions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "avatar"
    t.datetime "created_at", null: false
    t.string "currency"
    t.string "email"
    t.string "name"
    t.boolean "notifications"
    t.string "password_digest"
    t.datetime "updated_at", null: false
  end

  add_foreign_key "categories", "users"
  add_foreign_key "recurrings", "categories"
  add_foreign_key "recurrings", "users"
  add_foreign_key "transactions", "categories"
  add_foreign_key "transactions", "users"
end
