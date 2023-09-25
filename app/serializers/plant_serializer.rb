class PlantSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  
  attributes :id, :name, :species, :notes

  attribute :plant_ownerships, key: :plant_ownerships
  attribute :care_requirements, key: :care_requirements
  attribute :image_url, key: :image_url
 

  def plant_ownerships
    object.plant_ownerships
  end

  def care_requirements
    object.care_requirements.first
  end

  def image_url
    rails_blob_url(object.image) if object.image.attached?
  end
end
