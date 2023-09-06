class PlantsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_entity

    def index

    end

    def show

    end

    def create

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
