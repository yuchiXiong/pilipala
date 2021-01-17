Rails.application.routes.draw do
  root 'react_ssr#index'
  get '/', to: 'react_ssr#index'

  # get :editor, to: 'editor#index'

  # * API
  namespace :api do
    resource :blog_photos, only: [:create]
    resources :blogs, only: [:show, :update, :destroy, :create]
    resources :users, only: :blogs do
      get :blogs
    end
  end

  namespace :admin do
    root to: 'dashboard#index'
    resources :blogs
    get '*path', to: 'dashboard#index'
  end

  get '/*other', to: 'react_ssr#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # * 主页
  root 'blogs#index'

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    passwords: 'users/passwords'
  }

  resources :blogs, only: [:index, :show] do
    member do
      post :like
    end
    resources :comments do
      member do
        get :comment
      end
    end
  end
  resources :users do
    member do
      # * 更新用户信息
      match :update_info, to: redirect('users/edit'), via: :get
      match :update_info, via: [:put, :patch]
      post :follow
    end
  end

  get '*path', to: 'blogs#index'

end
