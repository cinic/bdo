require 'spec_helper'

describe CompanyEvent do
  it "accepts a title and body" do
    expect(FactoryGirl.build(:company_event, title: 'Новости компании', body: '<p>olololo</p><p>test</p>')).to be_valid
  end

  it "rejects if title not present" do
    expect(FactoryGirl.build(:company_event, title: '', body: '<p>olololo</p><p>test</p>')).not_to be_valid
  end
  it "rejects if body not present" do
    expect(FactoryGirl.build(:company_event, title: 'Новости компании', body: '')).not_to be_valid
  end
end
