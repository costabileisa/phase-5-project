require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should get index" do
    get users_url, as: :json
    assert_response :success
  end

  test "should create user" do
    assert_difference("User.count") do
      post users_url, params: { user: { avatar_url: @user.avatar_url, birthdate: @user.birthdate, email: @user.email, password_digest: @user.password_digest, region: @user.region, spotify_display_name: @user.spotify_display_name, spotify_email: @user.spotify_email, spotify_id: @user.spotify_id, spotify_img: @user.spotify_img, spotify_refresh_token: @user.spotify_refresh_token, spotify_region: @user.spotify_region, spotify_token: @user.spotify_token, spotify_token_lifetime: @user.spotify_token_lifetime, username: @user.username } }, as: :json
    end

    assert_response :created
  end

  test "should show user" do
    get user_url(@user), as: :json
    assert_response :success
  end

  test "should update user" do
    patch user_url(@user), params: { user: { avatar_url: @user.avatar_url, birthdate: @user.birthdate, email: @user.email, password_digest: @user.password_digest, region: @user.region, spotify_display_name: @user.spotify_display_name, spotify_email: @user.spotify_email, spotify_id: @user.spotify_id, spotify_img: @user.spotify_img, spotify_refresh_token: @user.spotify_refresh_token, spotify_region: @user.spotify_region, spotify_token: @user.spotify_token, spotify_token_lifetime: @user.spotify_token_lifetime, username: @user.username } }, as: :json
    assert_response :success
  end

  test "should destroy user" do
    assert_difference("User.count", -1) do
      delete user_url(@user), as: :json
    end

    assert_response :no_content
  end
end
