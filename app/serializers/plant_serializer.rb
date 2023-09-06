class PlantSerializer < ActiveModel::Serializer
  attributes :id, :name, :species, :notes
end
