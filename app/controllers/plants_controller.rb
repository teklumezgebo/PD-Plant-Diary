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
            plant_date: params[:plantDate]
        )
        render json: plant, status: :created
    end

    def update

    end

    def destroy

    end

    private

    def plant_params
        params.permit(:name, :species, :notes)
    end

end
