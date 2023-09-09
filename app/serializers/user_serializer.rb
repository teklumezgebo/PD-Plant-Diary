class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :location

  has_many :plant_ownerships
  has_many :plants
end
