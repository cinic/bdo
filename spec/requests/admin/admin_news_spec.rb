require 'spec_helper'

describe "Admin::News" do
  describe "GET /admin/news" do
    it "works! (now write some real specs)" do
      # Run the generator again with the --webrat flag if you want to use webrat methods/matchers
      get admin_news_index_path
      response.status.should be(200)
    end
  end
end
