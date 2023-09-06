class PlantOwnershipsController < ApplicationController
    validates :user_id, presence: true
    validates :plant_id, presence: true
end
