require 'spec_helper'

describe User do
  it "accepts a correctly-formatted email address" do
    expect(FactoryGirl.build(:user, email: 'cinic.rus@gmail.com', password: 'password')).to be_valid
  end
end
