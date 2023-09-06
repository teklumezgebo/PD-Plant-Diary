class User < ApplicationRecord
    has_secure_password
    
    has_many :plant_ownerships
    has_many :plants, through: :plant_ownerships

    validates :username, presence: true
    validates :username, uniqueness: true
end
