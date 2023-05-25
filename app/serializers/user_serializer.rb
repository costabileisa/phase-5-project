class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :username, :password_digest, :birthdate, :region, :avatar_url, :spotify_token, :spotify_refresh_token, :spotify_display_name, :spotify_email, :spotify_id, :spotify_img, :spotify_token_lifetime, :spotify_region
end
