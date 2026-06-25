class Recurring < ApplicationRecord
  belongs_to :user
  belongs_to :category, optional: true

  validates :name, presence: true
  validates :amount, presence: true, numericality: { greater_than: 0 }
  validates :recurring_type, presence: true, inclusion: { in: %w[expense income] }
  validates :frequency, presence: true, inclusion: { in: %w[monthly yearly weekly] }
  validates :day_of_month, numericality: { greater_than: 0, less_than_or_equal_to: 31 }, allow_nil: true

  scope :active, -> { where(is_active: true) }
  scope :expense, -> { where(recurring_type: 'expense') }
  scope :income, -> { where(recurring_type: 'income') }
end