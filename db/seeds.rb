user = User.create!(username: "example_user", password: "example_password")

locations = ['Window sill', 'Porch', 'Bedroom', 'Living room', 'Kitchen']
watering_frequencies = ['Daily', 'Twice daily', 'Three times a day', 'N/A']
light_durations = ['30 minutes', '45 minutes', '1 hour', '2 hours', '3 hours']
light_source = ['Sunlight', 'Lamp', 'None']
measurement_labels = ['m', 'cm', 'in', 'ft', 'lb', 'g', 'kg']

15.times do |i|
  plant = Plant.create(
    name: "Plant #{i + 1}",
    species: "Species #{i + 1}",
    notes: "Plant #{i + 1} is a very gorgeous and beautiful plant!"
  )

  CareRequirement.create(
    plant_id: plant.id,
    location: locations.sample(1)[0],
    watering_frequency: watering_frequencies.sample(1)[0],
    light_duration: light_durations.sample(1)[0],
    light_intensity: light_source.sample(1)[0],
    tracking: true,
    measurement_label: measurement_labels.sample(1)[0]
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