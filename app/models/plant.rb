class Plant < ApplicationRecord
    has_many :plant_ownerships
    has_many :users, through: :plant_ownerships

    validates :name, presence: true, uniqueness: true
    validates :species, presence: true
end
