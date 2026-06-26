class Api::V1::RecurringsController < ApplicationController
  def index
    recurrings = current_user.recurrings.includes(:category).order(next_date: :desc)
    render json: recurrings.map { |r| recurring_data(r) }, status: :ok
  end

  def create
    recurring = current_user.recurrings.new(recurring_params)
    if recurring.save
      render json: recurring_data(recurring), status: :created
    else
      render json: { errors: recurring.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    recurring = current_user.recurrings.find(params[:id])
    if recurring.update(recurring_params)
      render json: recurring_data(recurring), status: :ok
    else
      render json: { errors: recurring.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    recurring = current_user.recurrings.find(params[:id])
    recurring.destroy
    render json: { message: "Recurring berhasil dihapus" }, status: :ok
  end

  def toggle
    recurring = current_user.recurrings.find(params[:id])
    recurring.update(is_active: !recurring.is_active)
    render json: recurring_data(recurring), status: :ok
  end

  private

  def recurring_params
    params.permit(:name, :amount, :recurring_type, :day_of_month, :frequency, :is_active, :next_date, :category_id)
  end

  def recurring_data(r)
    {
      id: r.id,
      name: r.name,
      amount: r.amount,
      recurring_type: r.recurring_type,
      day_of_month: r.day_of_month,
      frequency: r.frequency,
      is_active: r.is_active,
      next_date: r.next_date,
      category: r.category ? { id: r.category.id, name: r.category.name, icon: r.category.icon } : nil
    }
  end
end