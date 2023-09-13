class RemoveNutrientsFromCareRequirement < ActiveRecord::Migration[6.1]
  def change
    remove_column :care_requirements, :nutrients
  end
end
