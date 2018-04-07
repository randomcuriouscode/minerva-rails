Rails.application.routes.draw do
  root to: 'visitors#index'
  get '/test/:id', to: 'test#test'
  post '/journals', to: 'journal#createJournal'
  get '/journals/all', to: 'journal#getAllJournals'
  get '/journals/title', to: 'journal#getJournals'
  post '/journals/:id/entry', to: 'ent#postEntry'
  get '/entries/:journal_id', to: 'ent#getEntries'
  post '/entries/search', to: 'ent#searchEntries'
  put '/entry/:id', to: 'ent#updateEntry' 
  get '/entry/:id', to: 'ent#getFullEntry'
end
