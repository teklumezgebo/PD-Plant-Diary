class CareRequirementsController < ApplicationController
    
    def record_data
        user = User.find(session[:user_id])
        plant = user.plants.find(params[:id])
      
        if !plant.care_requirements[0]

          care_requirement = CareRequirement.create(plant_id: plant.id)
          care_requirement.measurement_label = params[:label]
      
          if params[:measurement_date].nil? || params[:measurement_date].empty? || params[:measurement_value].nil? || params[:measurement_value].empty?
            render json: { error: 'A number and date are required' }, status: :unprocessable_entity
          else
            care_requirement.measurement_date.push(params[:measurement_date])
            care_requirement.measurement_value.push(params[:measurement_value])
            care_requirement.save
            render json: plant, status: :created
          end

        else

          if !plant.care_requirements[0].measurement_label
            plant.care_requirements[0].measurement_label = params[:label]
          end
      
          if params[:measurement_date].nil? || params[:measurement_date].empty? || params[:measurement_value].nil? || params[:measurement_value].empty? || !params[:measurement_value].integer?
            render json: { error: 'A number and date are required' }, status: :unprocessable_entity
          else
            plant.care_requirements[0].measurement_date.push(params[:measurement_date])
            plant.care_requirements[0].measurement_value.push(params[:measurement_value])
            plant.care_requirements[0].save
            render json: plant, status: :ok
          end

        end

      end

    def record_requirements
        user = User.find(session[:user_id])
        plant = user.plants.find(params[:id])

        if !plant.care_requirements[0]
            care_requirement = CareRequirement.create(
                plant_id: plant.id,
                location: params[:location],
                watering_frequency: params[:watering_frequency],
                light_intensity: params[:light_intensity],
                light_duration: params[:light_duration]
            )
            plant.update(notes: params[:notes].empty? ? plant.notes : params[:notes])
            render json: {plant: plant, care_requirement: care_requirement} , status: :created
        else
            plant.care_requirements[0].update(
                location: params[:location].empty? ? plant.care_requirements[0].location : params[:location],
                watering_frequency: params[:watering_frequency].empty? ? plant.care_requirements[0].watering_frequency : params[:watering_frequency],
                light_intensity: params[:light_intensity].empty? ? plant.care_requirements[0].light_intensity : params[:light_intensity],
                light_duration: params[:light_duration].empty? ? plant.care_requirements[0].light_duration : params[:light_duration],
            )
            plant.update(notes: params[:notes].empty? ? plant.notes : params[:notes])
            render json: {plant: plant, care_requirement: plant.care_requirements[0]}, status: :ok
        end
    end

    def initiate_tracking
        user = User.find(session[:user_id])
        plant = user.plants.find(params[:id])

        if !plant.care_requirements[0]
            care_requirement = CareRequirement.create(
                plant_id: plant.id,
                tracking: true
            )
            render json: plant, status: :created
        else
            plant.care_requirements[0].tracking = true
            plant.care_requirements[0].save
            render json: plant, status: :ok
        end
    end

end
