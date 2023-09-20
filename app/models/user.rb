class User < ApplicationRecord
    has_secure_password
    
    has_many :plant_ownerships
    has_many :plants, through: :plant_ownerships

    validates :username, presence: true
    validates :username, uniqueness: true
    validates :password, length: { minimum: 6, maximum: 20 }, on: :create
    validates :password, presence: true
end
