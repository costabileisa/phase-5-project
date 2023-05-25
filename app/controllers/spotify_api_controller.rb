class SpotifyApiController < ApplicationController

  def search_for_tracks
    if params[:search] != 'blank'
    songs = RSpotify::Track.search("#{params[:search]}", limit: 30)
    render json: songs, status: :ok
    else
      render json: {error: ["No search term provided"]}, status: :not_found
    end
  end

  def browse
    results = {}
    results[:artists] = RSpotify::Artist.search("#{params[:term]}", limit: 10)
    results[:tracks] = RSpotify::Track.search("#{params[:term]}", limit: 10)
    results[:albums] = RSpotify::Album.search("#{params[:term]}", limit: 10)
    results[:playlists] = RSpotify::Playlist.search("#{params[:term]}", limit: 10)
    render json: results, status: :ok
  end

  def featured_songs
    session[:current_featured_playlist] = session[:current_featured_playlist] || 0
    featuredPlaylistLength = RSpotify::Playlist.browse_featured.length
    def return_songs playlist_index
      featuredPlaylist = RSpotify::Playlist.browse_featured[playlist_index]
      unfilteredSongs = featuredPlaylist.tracks
      songs = unfilteredSongs.filter { |song| !song.preview_url.nil? }
      playlist = Hash.new
      playlist[:songs] = songs
      playlist[:playlist_info] = {
        name: featuredPlaylist.name,
        description: featuredPlaylist.description,
      }
      return playlist
    end
    if session[:current_featured_playlist] == featuredPlaylistLength - 1
      playlist = return_songs(session[:current_featured_playlist])
      session[:current_featured_playlist] = 0
      render json: playlist, status: :ok
    elsif session[:current_featured_playlist] > 0 && 
      playlist = return_songs(session[:current_featured_playlist])
      session[:current_featured_playlist] = session[:current_featured_playlist] + 1
      render json: playlist, status: :ok
    elsif session[:current_featured_playlist] == 0
      playlist = return_songs(session[:current_featured_playlist])
      session[:current_featured_playlist] = session[:current_featured_playlist] + 1
      render json: playlist, status: :ok
    else
      render json: { errors: ["An error occured, please try again."] }, status: :not_found
    end
  end

  def new_playlist
    spotify_user = RSpotify::User.new({
      'credentials' => {
        "token" => params[:spotify_token],
        "refresh_token" => params[:spotify_refresh_token],
      },
      'id' => params[:spotify_id]
    })
    new_playlist = spotify_user.create_playlist!(params[:playlists][:name])
    song_id_array = params[:playlists][:songs].map{|song| song[:spotify_id]}.filter{|id| !id.nil?}
    song_uri_array = RSpotify::Track.find(song_id_array).map{|song| song.uri }
    if filled_playlist = new_playlist.add_tracks!(song_uri_array) 
      render json: {message: "#{params[:playlists][:name]} has been succesfully added to your spotify account, #{params[:spotify_display_name]}"}, status: :created
    else 
      render json: {error: "A failure has occured while adding playlist #{params[:playlists][:name]}, please try again!"}, status: :bad_request
    end
  end

  def callback
    spotify_user = RSpotify::User.new(request.env['omniauth.auth'])
    current_user = User.find(session[:user_id])
    current_user.update_columns(
      spotify_token: spotify_user.credentials.token,
      spotify_refresh_token: spotify_user.credentials.refresh_token,
      spotify_token_lifetime: spotify_user.credentials.expires_at,
      spotify_display_name: spotify_user.display_name,
      spotify_email: spotify_user.email,
      spotify_id: spotify_user.id,
      spotify_img: spotify_user.images.length > 0 ? spotify_user.images[0].url : '',
      spotify_region: spotify_user.country,
    )
    redirect_to "http://localhost:4000/profile"
  end

end