class CreateRecurrings < ActiveRecord::Migration[8.1]
  def change
    create_table :recurrings do |t|
      t.string :name
      t.decimal :amount
      t.string :recurring_type
      t.integer :day_of_month
      t.string :frequency
      t.boolean :is_active
      t.date :next_date
      t.references :user, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
