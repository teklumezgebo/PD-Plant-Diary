class PlantSerializer < ActiveModel::Serializer
  attributes :id, :name, :species, :notes

  attribute :plant_ownerships, key: :plant_ownerships
  attribute :care_requirements, key: :care_requirements

  def plant_ownerships
    object.plant_ownerships
  end

  def care_requirements
    object.care_requirements
  end
end
