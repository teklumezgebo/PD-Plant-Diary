class ApplicationController < ActionController::API
  include ActionController::Cookies

  def invalid_entity(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

end
