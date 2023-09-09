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
        plant = user.plants.find(params[:plantId])
        plant.update(plant_params)
        render json: plant, status: :ok
    end

    def destroy
        user = User.find(session[:user_id])
        plant = user.plants.find(params[:plantId])
        plant.destroy
        head :no_content
    end

    private

    def plant_params
        params.permit(:name, :species, :notes)
    end

end
