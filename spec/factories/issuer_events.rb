# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :issuer_event do
    date "2013-11-26 18:03:54"
    title "Test news issuer event"
    body "<p>Lorem ipsum dolore</p>"
    _type "IssuerEvent"
    author "Alexander Andreev"
    published false
  end
end
