class Api::V1::DashboardController < ApplicationController
  def index
    transactions = current_user.transactions

    money_in = transactions.income.this_month.sum(:amount)
    money_out = transactions.expense.this_month.sum(:amount)
    net_cashflow = money_in - money_out

    upcoming = current_user.recurrings.active.order(:next_date).limit(5).map do |r|
      {
        id: r.id,
        name: r.name,
        amount: r.amount,
        recurring_type: r.recurring_type,
        next_date: r.next_date,
        category: r.category ? { id: r.category.id, name: r.category.name, icon: r.category.icon } : nil
      }
    end

    render json: {
      money_in: money_in,
      money_out: money_out,
      net_cashflow: net_cashflow,
      upcoming: upcoming
    }, status: :ok
  end
end