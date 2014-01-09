require 'spec_helper'

describe User do
  it "accepts a correctly-formatted email address" do
    FactoryGirl.build(:user, email: 'cinic.rus@gmail.com', password: 'password').should be_valid
  end
end
