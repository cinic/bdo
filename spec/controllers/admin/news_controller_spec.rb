require 'spec_helper'

describe Admin::NewsController do

  # This should return the minimal set of attributes required to create a valid
  # Admin::News. As you add validations to Admin::News, be sure to
  # adjust the attributes here as well.
  #let(:valid_attributes) { {  } }

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # Admin::NewsController. Be sure to keep this updated too.
  #let(:valid_session) { {} }
  describe 'user access' do
    
    before :each do
      user = User.create(
        email: 'cinic.rus@gmail.com',
        password: 'password'
      )
      session[:user_id] = user
    end

    describe "GET index" do
      it "assigns all admin_news as @admin_news" do
        news = News.all
        get :index
        assigns(:admin_news).should eq(news)
      end
    end

    describe "GET show" do
      it "assigns the requested admin_news as @admin_news" do
        news = News.create! FactoryGirl.attributes_for(:news)
        get :show, {:id => news.to_param}
        assigns(:admin_news).should eq(news)
      end
    end

    describe "GET new" do
      it "assigns a new admin_news as @admin_news" do
        get :new
        assigns(:admin_news).should be_a_new(News)
      end
    end

    describe "GET edit" do
      it "assigns the requested admin_news as @admin_news" do
        news = News.create! FactoryGirl.attributes_for(:news)
        get :edit, {:id => news.to_param}
        assigns(:admin_news).should eq(news)
      end
    end

    describe "POST create" do
      describe "with valid params" do
        it "creates a new News" do
          expect {
            post :create, admin_news: ActionController::Parameters.new(FactoryGirl.attributes_for(:news))
          }.to change(News, :count).by(1)
        end
      end
    end

    describe "DELETE destroy" do
      it "destroys the requested admin_news" do
        news = News.create! FactoryGirl.attributes_for(:news)
        expect {
          delete :destroy, {:id => news.to_param}
        }.to change(News, :count).by(-1)
      end

      it "redirects to the admin_news list" do
        news = News.create! FactoryGirl.attributes_for(:news)
        delete :destroy, {:id => news.to_param}
        response.should redirect_to(admin_news_index_path)
      end
    end
  end
end