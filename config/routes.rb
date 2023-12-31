Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/user/:username' => 'static_pages#user'
  get '/property/:id' => 'static_pages#property'
  get '/login' => 'static_pages#login'
  get 'booking/:id/success' => 'static_pages#success'
  get '/new-property' => 'static_pages#new_property'
  get '/my-properties' => 'static_pages#my_properties'
  get '/property/:id/update' => 'static_pages#update_properties'

  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resources :properties, only: [:index, :show, :create, :update, :destroy]
    resources :bookings, only: [:index, :create, :show]
    resources :charges, only: [:create]

    get 'bookings/:username/user' => 'bookings#index_by_user'
    get 'properties/:username/user' => 'properties#index_by_user'
    get '/properties/:id/bookings' => 'bookings#get_property_bookings'
    get '/authenticated' => 'sessions#authenticated'
  end
end
