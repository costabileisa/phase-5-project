class CreatePlaylists < ActiveRecord::Migration[7.0]
  def change
    create_table :playlists do |t|
      t.string :name
      t.integer :user_id
      t.string :image_url
      t.string :description
      t.string :spotify_id
      t.string :type_of_playlist

      t.timestamps
    end
  end
end
