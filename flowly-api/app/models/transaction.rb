class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :category, optional: true

  validates :amount, presence: true, numericality: { greater_than: 0 }
  validates :transaction_type, presence: true, inclusion: { in: %w[expense income] }
  validates :date, presence: true

  scope :expense, -> { where(transaction_type: 'expense') }
  scope :income, -> { where(transaction_type: 'income') }
  scope :this_month, -> { where(date: Time.current.beginning_of_month..Time.current.end_of_month) }
end