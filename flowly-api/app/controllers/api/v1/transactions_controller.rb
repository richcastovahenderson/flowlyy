class Api::V1::TransactionsController < ApplicationController
  def index
    transactions = current_user.transactions.includes(:category).order(date: :desc)

    if params[:month] && params[:year]
      transactions = transactions.where(
        date: Date.new(params[:year].to_i, params[:month].to_i).beginning_of_month..
              Date.new(params[:year].to_i, params[:month].to_i).end_of_month
      )
    end

    render json: transactions.map { |t| transaction_data(t) }, status: :ok
  end

  def create
    transaction = current_user.transactions.new(transaction_params)
    if transaction.save
      render json: transaction_data(transaction), status: :created
    else
      render json: { errors: transaction.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    transaction = current_user.transactions.find(params[:id])
    if transaction.update(transaction_params)
      render json: transaction_data(transaction), status: :ok
    else
      render json: { errors: transaction.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    transaction = current_user.transactions.find(params[:id])
    transaction.destroy
    render json: { message: "Transaksi berhasil dihapus" }, status: :ok
  end

  private

  def transaction_params
    params.permit(:amount, :transaction_type, :date, :notes, :is_recurring, :category_id)
  end

  def transaction_data(t)
    {
      id: t.id,
      amount: t.amount,
      transaction_type: t.transaction_type,
      date: t.date,
      notes: t.notes,
      is_recurring: t.is_recurring,
      category: t.category ? { id: t.category.id, name: t.category.name, icon: t.category.icon } : nil
    }
  end
end