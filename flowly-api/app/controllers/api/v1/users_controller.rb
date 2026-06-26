class Api::V1::UsersController < ApplicationController
  def show
    render json: user_data(current_user), status: :ok
  end

  def update
    if current_user.update(user_params)
      render json: user_data(current_user), status: :ok
    else
      render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    current_user.destroy
    render json: { message: "Akun berhasil dihapus" }, status: :ok
  end

  private

  def user_params
    params.permit(:name, :email, :currency, :avatar, :password, :password_confirmation)
  end

  def user_data(user)
    {
      id: user.id,
      name: user.name,
      email: user.email,
      currency: user.currency,
      avatar: user.avatar
    }
  end
end