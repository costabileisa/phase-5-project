class PlaylistsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  wrap_parameters format: []
  
  def index
    @playlists = Playlist.all
    render json: @playlists
  end

  def show
    playlist = Playlist.find(params[:id])
    render json: playlist, status: :ok
  end

  def create
    user = User.find(session[:user_id])
    new_playlist_name = user.playlists.length < 1 ? "My Playlist #1" : "My Playlist ##{user.playlists.last.id + 1}"
    playlist = user.playlists.create!(
      user_id: user.id,
      name: new_playlist_name,
      description: 'My Playlist includes ...',
      spotify_id: '',
      type_of_playlist: 'regular ol\' playlist',
      image: playlist_params[:params]
    )
    render json: playlist, status: :created
  end

  def update
    playlist = Playlist.find(params[:id])
    playlist.update!(playlist_params)
    render json: playlist, status: :ok
  end

  def destroy
    Playlist.find(params[:id]).destroy
    render json: {}, status: :ok
  end

  private
    def render_unprocessable_entity_response invalid
      render json: { error: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
  
    def render_not_found_response
      render json: { error: ["User not found"] }, status: :not_found
    end

    def playlist_params
      params.permit(:cover_blob, :user_id, :id, :name, :description, :spotify_id, :type_of_playlist, :image)
    end
    
end