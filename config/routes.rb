Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # * 主页
  root 'blogs#index'
  get :editor, to: 'editor#index'

  # * API
  namespace :api do
    resource :blog_photos, only: [:create]
    resources :blogs, only: [:show, :update, :destroy, :create]
    resources :users, only: :blogs do
      get :blogs
    end
  end

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
