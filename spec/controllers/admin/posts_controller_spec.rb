require 'spec_helper'

describe Admin::PostsController do
  before :all do
    current_user = login("cinic.rus@gmail.com","password")
  end
  describe "GET 'index'" do
    it "returns http success" do
      get 'index'
      expect(response).to be_success
    end
  end

end
