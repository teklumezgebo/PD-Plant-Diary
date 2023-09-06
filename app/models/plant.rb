class Plant < ApplicationRecord
    validates :name, :presence true
    validates :name, :uniqueness true
    validates :species, :presence true
end
