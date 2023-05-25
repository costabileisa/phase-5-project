class User < ApplicationRecord
  has_secure_password
  
  has_many :playlists

  validates :username, uniqueness: true
  validates :username, length: { minimum: 3 }
  validates :password, length: { in: 6..20 }
  validates :username, :email, :birthdate, :region, :avatar_url, presence: true
end