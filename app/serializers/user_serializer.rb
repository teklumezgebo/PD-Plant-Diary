class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :plant_ownerships
  has_many :plants
end
