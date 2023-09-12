class PlantsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_entity

    def index

    end

    def show

    end

    def create
        plant = Plant.create!(plant_params)
        ownership = PlantOwnership.create!(
            user_id: session[:user_id],
            plant_id: plant.id,
            plant_date: params[:plant_date]
        )
        render json: plant, status: :created
    end

    def update
        user = User.find(session[:user_id])
        plant = user.plants.find(params[:id])
        plant.update(plant_params)
        render json: plant, status: :ok
    end

    def destroy
        user = User.find(session[:user_id])
        plant = user.plants.find(params[:id])
        plant.destroy
        head :no_content
    end

    def record_data
        user = User.find(session[:user_id])
        plant = user.plants.find(params[:id])

        if !plant.care_requirements[0]
            care_requirement = CareRequirement.create(plant_id: plant.id)
            care_requirement.measurement_date.push(params[:measurementDate])
            care_requirement.measurement_value.push(params[:measurementValue])
            care_requirement.save
            render json: plant, status: :created
        else
            plant.care_requirements[0].measurement_date.push(params[:measurementDate])
            plant.care_requirements[0].measurement_value.push(params[:measurementValue])
            plant.care_requirements[0].save
            render json: plant, status: :created
        end
    end

    def record_requirements
        user = User.find(session[:user_id])
        plant = user.plants.find(params[:id])

        if !plant.care_requirements[0]
            care_requirement = CareRequirement.create(
                plant_id: plant.id,
                watering_frequency: params[:watering_frequency],
                light_intensity: params[:light_intensity],
                light_duration: params[:light_duration]
            )
            render json: plant, status: :created
        else
            plant.care_requirements[0].update(
                watering_frequency: params[:watering_frequency],
                light_intensity: params[:light_intensity],
                light_duration: params[:light_duration]
            )
            render json: plant, status: :created
        end
    end

    private

    def plant_params
        params.permit(:name, :species, :notes, :image)
    end

end
