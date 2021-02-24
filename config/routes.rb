Rails.application.routes.draw do

  root 'blogs#index'
  # * Pages
  resources :blogs, only: %i[index show]
  resources :users, path: :u, param: :space_name, only: [:show] do
    get :setting, to: 'others#index', on: :collection
  end

  devise_for :users, controllers: {
    sessions:      'users/sessions',
    registrations: 'users/registrations',
    passwords:     'users/passwords'
  }

  get :editor, to: 'editor#index'
  # resources :users, only: [:edit]

  # * APIs
  namespace :api do
    resources :blogs, except: %i[new edit] do
      post :photo
      post :like
      get :popular, on: :collection
      resources :comments, controller: :blog_comments, only: %i[index create destroy]
    end
    resources :users, path: :u, param: :space_name, only: :show do
      resources :blogs, only: :index, controller: :user_blogs do
        get :popular, on: :collection # * author's other blogs
        get :publications, on: :collection # * user's accessible blogs
      end
      post :follow
      match :info, via: %i[put patch]
      match :password, via: %i[put patch]
      get :popular, on: :collection # * popular authors
    end
  end

  # * 后台管理
  # namespace :admin do
  #   root to: 'dashboard#index'
  #   resources :blogs
  #   get '*path', to: 'dashboard#index'
  # end

  get '/*other', to: 'others#index'

end
