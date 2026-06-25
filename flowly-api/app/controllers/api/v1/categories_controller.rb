class Api::V1::CategoriesController < ApplicationController
  def index
    categories = current_user.categories.all
    render json: categories, status: :ok
  end

  def create
    category = current_user.categories.new(category_params)
    if category.save
      render json: category, status: :created
    else
      render json: { errors: category.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    category = current_user.categories.find(params[:id])
    if category.update(category_params)
      render json: category, status: :ok
    else
      render json: { errors: category.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    category = current_user.categories.find(params[:id])
    category.destroy
    render json: { message: "Category berhasil dihapus" }, status: :ok
  end

  private

  def category_params
    params.permit(:name, :icon)
  end
end