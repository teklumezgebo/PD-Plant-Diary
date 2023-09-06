class CreatePlantOwnerships < ActiveRecord::Migration[6.1]
  def change
    create_table :plant_ownerships do |t|
      t.integer :user_id
      t.integer :plant_id
      t.string :plant_date

      t.timestamps
    end
  end
end
