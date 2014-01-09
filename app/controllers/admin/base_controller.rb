class Admin::BaseController < ApplicationController
  before_filter :authorize
  helper_method :current_user, :logged_in?
  private

    def current_user
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end

    def authorize
      redirect_to admin_login_url, alert: "Not authorized" if current_user.nil? && params[:controller] != "admin/sessions"
    end

    def logged_in?
      current_user != nil
    end
end
