# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_05_25_182825) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "albums", force: :cascade do |t|
    t.string "name"
    t.string "release_date"
    t.integer "total_tracks"
    t.string "image_url"
    t.integer "spotify_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "playlists", force: :cascade do |t|
    t.string "name"
    t.integer "user_id"
    t.string "image"
    t.string "description"
    t.string "spotify_id"
    t.string "type_of_playlist"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "songs", force: :cascade do |t|
    t.string "featured_artist"
    t.string "release_date"
    t.string "name"
    t.string "genre"
    t.integer "playlist_id"
    t.integer "album_id"
    t.integer "spotify_playlist_id"
    t.integer "spotify_album_id"
    t.string "preview_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "username"
    t.string "password_digest"
    t.string "birthdate"
    t.string "region"
    t.string "avatar_url"
    t.string "spotify_token"
    t.string "spotify_refresh_token"
    t.string "spotify_display_name"
    t.string "spotify_email"
    t.string "spotify_id"
    t.string "spotify_img"
    t.integer "spotify_token_lifetime"
    t.string "spotify_region"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
