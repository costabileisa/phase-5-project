class Album < ApplicationRecord
  has_many :songs
  has_many :playlists, through: :songs

  def update_album
    album = RSpotify::Album.find(self.spotify_id)

    self.update!(
      name: album.name,
      release_date: album.release_date,
      total_tracks: album.total_tracks,
      image_url: album.images.first['url'],
      spotify_id: album.id,
    )
  end
end