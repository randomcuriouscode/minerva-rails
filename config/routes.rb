Rails.application.routes.draw do
  root to: 'visitors#index'
  get '/test/:id', to: 'test#test'
end
