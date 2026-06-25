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
    render json: { message: "Akun berhasil dihapus" },