class PlantOwnershipSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :plant_id, :plant_date

  belongs_to :user
  belongs_to :plant
end
