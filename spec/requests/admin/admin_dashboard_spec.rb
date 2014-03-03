require 'spec_helper'

describe "Admin Dashboard" do

  it "redirect to login page if not logged in" do
    get "/admin"
    expect(response).to redirect_to("/admin/login")
    follow_redirect!
    expect(response).to render_template(:new)
  end
end
