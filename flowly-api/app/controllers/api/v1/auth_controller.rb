class Api::V1::AuthController < ApplicationController
  skip_before_action :authenticate_request, only: [:register, :login]

  def register
    user = User.new(user_params)
    if user.save
      token = generate_token(user.id)
      render json: { token: token, user: user_data(user) }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      token = generate_token(user.id)
      render json: { token: token, user: user_data(user) }, status: :ok
    else
      render json: { error: "Email atau password salah" }, status: :unauthorized
    end
  end

  def logout
    render json: { message: "Logout berhasil" }, status: :ok
  end

  private

  def user_params
    params.permit(:name, :email, :password, :password_confirmation)
  end

  def generate_token(user_id)
    payload = { user_id: user_id, exp: 24.hours.from_now.to_i }
    JWT.encode(payload, Rails.application.secret_key_base, "HS256")
  end

  def user_data(user)
    { id: user.id, name: user.name, email: user.email, currency: user.currency, avatar: user.avatar }
  end
end