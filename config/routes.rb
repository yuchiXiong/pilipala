Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'blogs#index'
  get :editor, to: 'editor#index'

  devise_for :users

  resource :blog_photos, only: [:create]

  resources :blogs

  resources :users do
    member do
      get 'blogs'
    end
  end

end
