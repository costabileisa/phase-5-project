class Playlist < ApplicationRecord
  belongs_to :user
  has_many :songs, dependent: :destroy
  has_many :artists, through: :songs
  has_many :albums, through: :songs

  has_one_attached :cover_blob
end