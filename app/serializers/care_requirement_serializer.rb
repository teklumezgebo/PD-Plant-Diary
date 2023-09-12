class CareRequirementSerializer < ActiveModel::Serializer
  attributes :id, :location, :watering_frequency, :light_duration, :light_intensity, :measurement_date, :measurement_value
end
