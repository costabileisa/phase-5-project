class CreateAlbums < ActiveRecord::Migration[7.0]
  def change
    create_table :albums do |t|
      t.string :name
      t.string :release_date
      t.integer :total_tracks
      t.string :image_url
      t.string :spotify_id

      t.timestamps
    end
  end
end
