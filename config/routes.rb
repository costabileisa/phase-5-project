Rails.application.routes.draw do
  resources :albums
  resources :songs
  resources :playlists
  resources :users, only: [:create]

  get '/me', to: "sessions#show"
  post '/login', to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get "auth/spotify/callback", to: "spotify_api#callback"
  get "spotify_api/songs/:search", to: "spotify_api#search_for_tracks"
  get "spotify_api/user", to: "spotify_api#current_user"
  get "spotify_api/browse", to: "spotify_api#browse"
  get "spotify_api/show_featured", to: "spotify_api#featured_songs"
  post "spotify_api/save_playlist", to: "spotify_api#new_playlist"
  get "spotify_api/update_token", to: "spotify_api#update_token"

  # get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
  
end