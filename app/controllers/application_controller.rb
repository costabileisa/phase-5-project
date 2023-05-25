class ApplicationController < ActionController::Base
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  private

  def render_not_found_response(exception)
    render json: { errors: exception.model + " not found" }, status: :unprocessable_entity
  end

  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end
end
