class SessionsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  wrap_parameters format: []
  
  def create
    this_user = User.find_by!(username: user_params[:username])
    if this_user&.authenticate(user_params[:password])
      session[:user_id] = this_user.id
      user = clear_spotify_information(this_user)
      render json: user, include: ['playlists', 'playlists.songs', 'playlists.songs.album'], status: 201
    else
      render json: { errors: ["Username or Password is incorrect"] }, status: :unprocessable_entity
    end
  end
  
  def show
    if session[:user_id]
      user = User.find(session[:user_id])
      render json: user, include: ['playlists', 'playlists.songs', 'playlists.songs.album'], status: :ok
    else
      render json: {errors: ["Please login to use cookies"]}, status: :unauthorized
    end
  end

  def destroy
    user = User.find(session[:user_id])
    clear_spotify_information(user)
    session[:user_id] = nil
    head :no_content
  end

  private 

  def user_params
    params.permit(:username, :password)
  end

  def render_unprocessable_entity_response invalid
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_not_found_response
    render json: { errors: ["User not found"] }, status: :not_found
  end

  def clear_spotify_information user
    user.update_columns(
      spotify_token: '',
      spotify_refresh_token: '',
      spotify_token_lifetime: '',
      spotify_display_name: '',
      spotify_email: '',
      spotify_id: '',
      spotify_img: '',
      spotify_region: '',
    )
    user
  end

end