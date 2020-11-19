Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # * 主页
  root 'blogs#index'
  get :editor, to: 'editor#index'

  devise_for :users, controllers: {
    sessions:      'users/sessions',
    registrations: 'users/registrations',
    passwords:     'users/passwords'
  }

  # * API
  namespace :api do
    resource :blog_photos, only: [:create]
    resources :blogs, only: [:update, :destroy, :create]
    resources :users, only: :blogs do
      get :blogs
    end
  end

  resources :blogs, only: [:index, :show] do
    member do
      post :like
    end
  end
  resources :users do
    member do
      # * 更新用户信息
      match :update_info, to: redirect('users/edit'), via: :get
      match :update_info, via: [:put, :patch]
    end
  end

  get '*path', to: 'welcome#not_found'

end
