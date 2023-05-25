class CreateSongs < ActiveRecord::Migration[7.0]
  def change
    create_table :songs do |t|
      t.string :release_date
      t.string :name
      t.string :genre
      t.integer :playlist_id
      t.integer :album_id
      t.string :spotify_playlist_id
      t.string :spotify_album_id
      t.string :preview_url

      t.timestamps
    end
  end
end
