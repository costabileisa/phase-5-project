class SongsController < ApplicationController
  wrap_parameters format: []

def index
  @songs = Song.all
  render json: @songs
end

def show
  render json: @song
end

def create
  playlist = Playlist.find(song_params[:playlist_id])
  artist = Artist.create!(spotify_id: song_params[:spotify_artist_id])
  artist.update_artist
  album = Album.create!(
    spotify_id: song_params[:spotify_album_id],
    artist_id: artist.id
  )
  album.update_album
  updated_song_params = song_params.clone
  updated_song_params["artist_id"] = artist.id
  updated_song_params["album_id"] = album.id
  song = playlist.songs.create!(updated_song_params)
  render json: song, status: :created
end

def update
  if @song.update(song_params)
    render json: @song
  else
    render json: @song.errors, status: :unprocessable_entity
  end
end

def destroy
  song = Song.find(params[:id]).destroy
  render json: {}, status: :accepted
end

private

  def song_params
    params.permit(:cover_art, :preview_url, :playlist_id, :name, :preview_url, :spotify_album_id, :spotify_playlist_id, :spotify_artist_id, :featured_artist, :release_date, :genre, :spotify_id)
  end
end