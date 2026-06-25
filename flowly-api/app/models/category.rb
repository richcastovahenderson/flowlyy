class Category < ApplicationRecord
  belongs_to :user

  validates :name, presence: true
  validates :name, uniqueness: { scope: :user_id, message: "sudah ada untuk user ini" }
end