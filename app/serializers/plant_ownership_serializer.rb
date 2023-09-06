class PlantOwnershipSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :plant_id, :plant_date
end
