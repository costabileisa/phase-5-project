class UsersController < ApplicationController
  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user
  end

  private

  def user_params
    params.permit(:username, :password, :password_confirmation, :avatar_url, :email, :birthdate, :region)
  end

# add an update method here
end
