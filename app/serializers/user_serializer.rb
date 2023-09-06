class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :location

  has_many :plant_ownerships
  has_many :plants
end
