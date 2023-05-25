class PlaylistSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :name, :description, :spotify_id, :type_of_playlist, :image_url
  has_many :songs
  belongs_to :user

end