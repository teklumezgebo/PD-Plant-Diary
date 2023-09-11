class Plant < ApplicationRecord
    has_one_attached :image
    
    has_many :plant_ownerships
    has_many :users, through: :plant_ownerships
    has_many :care_requirements

    validates :name, presence: true, uniqueness: true
    validates :species, presence: true
end
