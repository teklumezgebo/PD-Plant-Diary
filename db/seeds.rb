# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create!(username: "example_user", password: "example_password")

# Create 15 plants with care requirements and plant ownerships
15.times do |i|
  plant = Plant.create(
    name: "Plant #{i + 1}",
    species: "Species #{i + 1}",
    notes: "Notes for plant #{i + 1}"
  )

  CareRequirement.create(
    plant_id: plant.id,
    location: "Location #{i + 1}",
    watering_frequency: "Watering frequency #{i + 1}",
    light_duration: "Light duration #{i + 1}",
    light_intensity: "Light intensity #{i + 1}",
    tracking: true,
    measurement_label: "Label #{i + 1}"
  )

  plant.care_requirements[0].measurement_date.push('2023-09-28T00:11:54.908Z', '2023-09-29T00:11:54.908Z', '2023-09-30T00:11:54.908Z', '2023-10-01T00:11:54.908Z', '2023-10-02T00:11:54.908Z', '2023-10-03T00:11:54.908Z', '2023-10-04T00:11:54.908Z', '2023-10-05T00:11:54.908Z', '2023-10-06T00:11:54.908Z', '2023-10-07T00:11:54.908Z', '2023-10-08T00:11:54.908Z', '2023-10-09T00:11:54.908Z', '2023-10-10T00:11:54.908Z', '2023-10-11T00:11:54.908Z', '2023-10-12T00:11:54.908Z')
  plant.care_requirements[0].measurement_value.push(20, 26, 36, 24, 44, 55, 51, 38, 47, 57, 61, 64, 55, 65, 62)
  plant.care_requirements[0].save

  PlantOwnership.create(
    user_id: user.id,
    plant_id: plant.id,
    plant_date: (Date.today - (i + 1).days).to_s
  )
end