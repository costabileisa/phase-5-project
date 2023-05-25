class SessionsController < ApplicationController
  def show
    if session[:user_id]
      user = User.find!(session[:user_id])
      render json: user, status: :ok
    else
      render json: {errors: ["Please login!"]}, status: :unauthorized
    end
  end

  def create
    user = User.find_by!(username: user_params[:username])
    if user&.authenticate(user_params[:password])
      session[:user_id] = user.id
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
      render json: user, status: :ok
    else
      render json: { errors: ["Username or Password is incorrect"] }, status: :unprocessable_entity
    end
  end

  def destroy
    session.delete :user_id
    head :no_content
  end

  private 

  def user_params
    params.permit(:username, :password)
  end

end
