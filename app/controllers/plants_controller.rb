class PlantsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_entity

    def index
        user = User.find(session[:user_id])
        render json: user.plants.all, status: :ok
    end

    def show
        user = User.find(session[:user_id])
        plant = user.plants.find(params[:id])
        render json: plant, status: :ok
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
        plant.image.attach(params[:image]) if params[:image].present?
        plant.save
        render json: plant, status: :ok
    end

    def destroy
        user = User.find(session[:user_id])
        plant = user.plants.find(params[:id])
        plant.destroy
        head :no_content
    end

    private

    def plant_params
        params.permit(:name, :species, :notes, :image)
    end

end
