class SongSerializer < ActiveModel::Serializer
  attributes :preview_url, :id, :album_id, :playlist_id, :artist_id, :release_date, :name, :genre, :spotify_playlist_id, :spotify_album_id, :spotify_id
  belongs_to :playlist
  belongs_to :album
end