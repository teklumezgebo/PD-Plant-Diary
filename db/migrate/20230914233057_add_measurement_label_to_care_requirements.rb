class AddMeasurementLabelToCareRequirements < ActiveRecord::Migration[6.1]
  def change
    add_column :care_requirements, :measurement_label, :string
  end
end
