Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :blogs

  resource :sessions, :blog_photos, only: [:create]

  resources :users do
    member do
      get 'blogs'
    end
  end

end
