Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resource :user, only: %i[edit update]
  resources :users, only: [:index]
  resources :groups, only: %i[new create edit update] do
    resources :messages, only: %i[index create]
    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end
  end
end
