Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, format: 'json' do
    namespace :v1 do
      resource :sessions, only: [:create]
      resources :blogs, except: [:new, :edit]
    end
  end

end
