require "test_helper"

class SongsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @song = songs(:one)
  end

  test "should get index" do
    get songs_url, as: :json
    assert_response :success
  end

  test "should create song" do
    assert_difference("Song.count") do
      post songs_url, params: { song: { featured_artist: @song.featured_artist, genre: @song.genre, name: @song.name, preview_url: @song.preview_url, release_date: @song.release_date, spotify_album_id: @song.spotify_album_id, spotify_artist_id: @song.spotify_artist_id, spotify_playlist_id: @song.spotify_playlist_id } }, as: :json
    end

    assert_response :created
  end

  test "should show song" do
    get song_url(@song), as: :json
    assert_response :success
  end

  test "should update song" do
    patch song_url(@song), params: { song: { featured_artist: @song.featured_artist, genre: @song.genre, name: @song.name, preview_url: @song.preview_url, release_date: @song.release_date, spotify_album_id: @song.spotify_album_id, spotify_artist_id: @song.spotify_artist_id, spotify_playlist_id: @song.spotify_playlist_id } }, as: :json
    assert_response :success
  end

  test "should destroy song" do
    assert_difference("Song.count", -1) do
      delete song_url(@song), as: :json
    end

    assert_response :no_content
  end
end
