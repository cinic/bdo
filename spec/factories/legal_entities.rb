# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :legal_entity do
    org_name_full "MyString"
    org_name_short "MyString"
    org_name_full_en "MyString"
    org_name_short_en "MyString"
    bic 1
    taxpayer_id 1
    taxpayer_crr 1
    reg_place "MyString"
  end
end
