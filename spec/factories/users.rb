# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user do
    email "cinic.rus@gmail.com"
    full_name "Alexander Andreev"
    password_salt "$2a$10$1IEJOIncsmJESVAuAB5zOO"
    password_hash "$2a$10$1IEJOIncsmJESVAuAB5zOO2Ao36Jj91HVThq3tMiN.dEF0FkVHwfe"
    role "admin"
    last_sign_in_at "2013-11-14 18:50:35"
    last_sign_in_ip "MyString"
  end
end
