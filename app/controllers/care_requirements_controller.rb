class CareRequirementsController < ApplicationController
    
    def record_data
        user = User.find(session[:user_id])
        plant = user.plants.find(params[:id])

        if !plant.care_requirements[0]
            care_requirement = CareRequirement.create(plant_id: plant.id)
            care_requirement.measurement_label = params[:label]
            care_requirement.measurement_date.push(params[:measurement_date])
            care_requirement.measurement_value.push(params[:measurement_value])
            care_requirement.save
            render json: plant, status: :created
        else
            if !plant.care_requirements[0].measurement_label
                plant.care_requirements[0].measurement_label = params[:label]
            end
            plant.care_requirements[0].measurement_date.push(params[:measurement_date])
            plant.care_requirements[0].measurement_value.push(params[:measurement_value])
            plant.care_requirements[0].save
            render json: plant, status: :ok
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
            render json: plant, status: :created
        else
            plant.care_requirements[0].update(
                location: params[:location] == '' ? plant.care_requirements[0].location : params[:location],
                watering_frequency: params[:watering_frequency] == '' ? plant.care_requirements[0].watering_frequency : params[:watering_frequency],
                light_intensity: params[:light_intensity] == '' ? plant.care_requirements[0].light_intensity : params[:light_intensity],
                light_duration: params[:light_duration] == '' ? plant.care_requirements[0].light_duration : params[:light_duration]
            )
            render json: plant, status: :ok
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
