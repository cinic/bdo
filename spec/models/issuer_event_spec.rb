require 'spec_helper'

describe IssuerEvent do
  it "accepts a title and body" do
    expect(FactoryGirl.build(:issuer_event, title: 'Новости компании', body: '<p>olololo</p><p>test</p>')).to be_valid
  end

  it "rejects if title not present" do
    expect(FactoryGirl.build(:issuer_event, title: '', body: '<p>olololo</p><p>test</p>')).not_to be_valid
  end
  it "rejects if body not present" do
    expect(FactoryGirl.build(:issuer_event, title: 'Новости компании', body: '')).not_to be_valid
  end
end
