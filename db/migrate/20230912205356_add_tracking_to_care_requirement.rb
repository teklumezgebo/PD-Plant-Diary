class AddTrackingToCareRequirement < ActiveRecord::Migration[6.1]
  def change
    add_column :care_requirements, :tracking, :boolean
  end
end
