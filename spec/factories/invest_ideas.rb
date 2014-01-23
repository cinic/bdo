# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :invest_idea do
    date "2013-11-26 18:03:54"
    title "Test news issuer event"
    body "<p>Lorem ipsum dolore</p>"
    _type "InvestIdea"
    author "Alexander Andreev"
    period "1-2 month"
    tool "MMTS"
    marketplace "MICEX"
    expected_profit 20
    risk 11
    liquidity 470
    percentage 20
    release false
    published false
  end
end
