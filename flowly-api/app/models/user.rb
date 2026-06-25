class User < ApplicationRecord
  has_secure_password

  has_many :categories, dependent: :destroy
  has_many :transactions, dependent: :destroy
  has_many :recurrings, dependent: :destroy

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :currency, inclusion: { in: %w[USD IDR EUR] }, allow_nil: true
end