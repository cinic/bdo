class Admin::SessionsController < Admin::BaseController
  layout "admin_login"
  def new
  end

  def create
    user = User.where({email: params[:email]}).first
    
    if user && User.authenticate(params[:email], params[:password])
      session[:user_id] = user.id
      redirect_to admin_url, notice: "Logged in!"
    else
      flash.now.alert = "Неправильный email или пароль."
      render 'new'
      #redirect_to admin_login_url, alert: "Email or password is invalid"
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url, notice: "Logged out!"
  end
end
