Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      # Auth
      post 'auth/register', to: 'auth#register'
      post 'auth/login',    to: 'auth#login'
      delete 'auth/logout', to: 'auth#logout'

      # Users
      get    'users/me',    to: 'users#show'
      put    'users/me',    to: 'users#update'
      delete 'users/me',    to: 'users#destroy'

      # Categories
      resources :categories, only: [:index, :create, :update, :destroy]

      # Transactions
      resources :transactions, only: [:index, :create, :update, :destroy]

      # Recurrings
     # Recurrings
      resources :recurrings, only: [:index, :create, :update, :destroy] do
      patch :toggle, on: :member
      end

      # Dashboard
      get 'dashboard', to: 'dashboard#index'
    end
  end
end