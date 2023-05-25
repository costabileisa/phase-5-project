class PlaylistSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :description, :spotify_id, :type_of_playlist
end
