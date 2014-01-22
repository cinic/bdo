require 'spec_helper'

describe InvestIdea do
  it "accepts a all fields" do
    expect(FactoryGirl.build(:invest_idea, title: 'Инвест идея', body: '<p>olololo</p><p>test</p>')).to be_valid
  end

  it "rejects if title not present" do
    expect(FactoryGirl.build(:invest_idea, title: '', body: '<p>olololo</p><p>test</p>')).not_to be_valid
  end
  it "rejects if body not present" do
    expect(FactoryGirl.build(:invest_idea, title: 'Новости компании', body: '')).not_to be_valid
  end
end
