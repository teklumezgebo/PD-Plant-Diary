Rails.application.routes.draw do
  resources :care_requirements
  resources :plant_ownerships
  resources :plants
  resources :users, only: [:show, :create, :destroy]
  get '/auth', to: "users#show"
  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"
  patch '/record_data/:id', to: "care_requirements#record_data"
  patch '/record_requirements/:id', to: "care_requirements#record_requirements"
  patch '/initiate_tracking/:id', to: "care_requirements#initiate_tracking"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
