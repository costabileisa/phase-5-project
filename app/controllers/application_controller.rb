class ApplicationController < ActionController::Base
  include ActionController::Cookies

  skip_before_action :verify_authenticity_token

  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response


  def render_unprocessable_entity_response exception
    render json: { error: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_not_found_response exception
    render json: { error: [exception.model + "not found"] }, status: :not_found
  end
  
end
