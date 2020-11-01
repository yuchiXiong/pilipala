Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # * 主页
  root 'blogs#index'
  get :editor, to: 'editor#index'

  devise_for :users, controllers: {
    sessions:      'users/sessions',
    registrations: 'users/registrations'
  }

  # namespace :api do
  #   resources :users, only: [:update_info] do
  #     member do
  #       match :update_info, via: [:put, :patch]
  #     end
  #   end
  # end

  resource :blog_photos, only: [:create]

  resources :blogs

  resources :users do
    member do
      get 'blogs'
      # * 更新用户信息
      match :update_info, to: redirect('users/edit'), via: [:get]
      match :update_info, via: [:put, :patch]
    end
  end

  get '*path', to: 'welcome#not_found'

end
