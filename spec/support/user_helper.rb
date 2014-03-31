module UserHelper
  def login(email,password)
    visit admin_login_path
    fill_in 'email', with: email
    fill_in 'password', with: password
    click_button 'Войти'
  end
end