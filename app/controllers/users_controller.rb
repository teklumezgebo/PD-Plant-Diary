class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :user_not_found

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    private

    def user_params
        params.permit(:username, :password)
    end

    def user_not_found
        render json: { error: "User not found" }, status: :not_found 
    end
end
