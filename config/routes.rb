Rails.application.routes.draw do

  root 'blogs#index'
  # * Pages
  resources :blogs, only: [:index, :show]
  resources :users, path: :u, param: :space_name, only: [:show]

  devise_for :users, controllers: {
    sessions:      'users/sessions',
    registrations: 'users/registrations',
    passwords:     'users/passwords'
  }

  get :editor, to: 'editor#index'
  resources :users, only: [:edit]

  # * APIs
  namespace :api do
    resources :blogs, only: [:index, :create, :update, :destroy, :show] do
      post :photo
      post :like
      resources :comments, only: [:index, :create, :destroy]
      collection do
        get :popular
      end
    end
    resources :users, path: :u, param: :space_name, only: [:show, :destroy] do
      # get :blogs
      resources :blogs, only: [:index], controller: :users do
        collection do
          get :popular, to: 'users#popular_blogs'
        end
      end
      get :publications
      post :follow
      match :info, via: [:put, :patch]
      match :password, via: [:put, :patch]
      collection do
        get :popular
      end
    end
  end

  # * 后台管理
  namespace :admin do
    root to: 'dashboard#index'
    resources :blogs
    get '*path', to: 'dashboard#index'
  end

  # get '/*other', to: 'blogs#index'

end
