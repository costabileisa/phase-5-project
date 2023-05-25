class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  wrap_parameters format: []

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, include: ['playlists', 'playlists.songs', 'playlists.songs.artist', 'playlists.songs.album'], status: :created
  end

  private 

  def user_params
    params.permit(:username, :password, :password_confirmation, :avatar_url, :email, :birthdate, :region)
  end

  def render_unprocessable_entity_response invalid
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_not_found_response
    render json: { errors: ["User not found"] }, status: :not_found
  end
end