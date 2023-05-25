class PlaylistSerializer < ActiveModel::Serializer
  attributes :cover_blob, :id, :user_id, :name, :description, :spotify_id, :type_of_playlist, :image
  has_many :songs
  belongs_to :user

end