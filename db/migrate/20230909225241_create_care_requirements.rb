class CreateCareRequirements < ActiveRecord::Migration[6.1]
  def change
    create_table :care_requirements do |t|
      t.integer :plant_id
      t.string :location
      t.string :watering_frequency
      t.string :light_duration
      t.string :light_intensity
      t.string :nutrients, array: true, default: []
      t.string :measurement_date, array: true, default: []
      t.string :measurement_value, array: true, default: []
      t.timestamps
    end
  end
end
