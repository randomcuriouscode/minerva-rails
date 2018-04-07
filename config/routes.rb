Rails.application.routes.draw do
  root to: 'visitors#index'
  get '/test/:id', to: 'test#test'
  post '/journals', to: 'journal#createJournal'
  get '/journals/all', to: 'journal#getAllJournals'
  post '/journals/search', to: 'journal#searchJournals'
  post '/journals/:id/entry', to: 'ent#postEntry'
  get '/entries/:journal_id', to: 'ent#getEntries'
  put '/entry/:id', to: 'ent#updateEntry' 
  get '/entry/:id', to: 'ent#getFullEntry'
end
