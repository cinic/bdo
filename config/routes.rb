OpenBroker::Application.routes.draw do
  namespace :admin do
    mount Ckeditor::Engine => '/ckeditor'
    get '', to: 'dashboard#index', as: '/'
    get 'login', to: 'sessions#new', as: 'login'
    get 'logout', to: 'sessions#destroy', as: 'logout'
    post 'sessions', to: 'sessions#create'
    delete 'sessions', to: 'sessions#destroy'
    resources :news
    namespace :posts do
      resources :company_events, :issuer_events, :invest_ideas, :structural_products
    end
    resources :posts, only: [:index]
    resources :prospects, only: [:index, :show]
  end

  get '/index', to: redirect('/')
  get "/*id", to: 'pages#show', as: :page, :format => false, :constraints => HighVoltage::Constraints::RootRoute
  post "/*id", to: 'pages#create', :format => false, :constraints => HighVoltage::Constraints::RootRoute
  root to: 'pages#show', id: 'index'
end