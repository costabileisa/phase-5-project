class CreateSongs < ActiveRecord::Migration[7.0]
  def change
    create_table :songs do |t|
      t.string :featured_artist
      t.string :release_date
      t.string :name
      t.string :genre
      t.integer :spotify_playlist_id
      t.integer :spotify_album_id
      t.string :preview_url

      t.timestamps
    end
  end
end
