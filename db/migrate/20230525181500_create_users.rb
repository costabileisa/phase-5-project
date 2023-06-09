class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :username
      t.string :password_digest
      t.string :birthdate
      t.string :region
      t.string :avatar_url
      t.string :spotify_token
      t.string :spotify_refresh_token
      t.string :spotify_display_name
      t.string :spotify_email
      t.string :spotify_id
      t.string :spotify_img
      t.string :spotify_token_lifetime
      t.string :spotify_region

      t.timestamps
    end
  end
end
