class SongSerializer < ActiveModel::Serializer
  attributes :id, :featured_artist, :release_date, :name, :genre, :spotify_playlist_id, :spotify_album_id, :spotify_artist_id, :preview_url
end
