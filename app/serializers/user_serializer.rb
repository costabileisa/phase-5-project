class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :username, :password_digest, :birthdate, :region
end
