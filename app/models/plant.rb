class Plant < ApplicationRecord
    has_one_attached :image
     
    has_many :plant_ownerships, dependent: :destroy
    has_many :users, through: :plant_ownerships
    has_many :care_requirements, dependent: :destroy

    validates :name, presence: true, length: { minimum: 1 }, on: :create
    validates :species, presence: true

end
