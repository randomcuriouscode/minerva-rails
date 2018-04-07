Rails.application.routes.draw do
  root to: 'visitors#index'
  get '/test/:id', to: 'test#test'
  post '/journals', to: 'journal#createJournal'
  post '/journals/:id/entry', to: 'ent#postEntry'
  get '/journals/all', to: 'journal#getAllJournals'
  get '/journals/title', to: 'journal#getJournals'
  get '/journals/:id', to: 'journal#getJournal'
  put '/entry/:id', to: 'ent#updateEntry' 
  get '/entry/:id', to: 'ent#getFullEntry'
end
