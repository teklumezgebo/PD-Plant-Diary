class PlantSerializer < ActiveModel::Serializer
  attributes :id, :name, :species, :notes

  has_many :plant_ownerships
  has_many :users
end
