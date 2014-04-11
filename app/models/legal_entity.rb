class LegalEntity
  include Mongoid::Document
  field :org_name_full, type: String
  field :org_name_short, type: String
  field :org_name_full_en, type: String
  field :org_name_short_en, type: String
  field :bic, type: Integer
  field :taxpayer_id, type: Integer
  field :taxpayer_crr, type: Integer
  field :reg_place, type: String
  field :contact_person, type: Array
  field :representatives, type: Array
  field :founders, type: Array #[{name: string, passport: string, share: string}]
  field :beneficiaries, type: Array #[{first_name: string, last_name: string, patronymic: string, birth_date: date, country: string, passport: string, serial_num: string, subdivision_code: string, issue_date: date, issue_by: string, address_reg: {city: string, address: string, index: integer}, address_post: {city: string, address: string, index: integer}}]
  field :addresses, type: Array #[{country: string, index: integer, subject: string, region: string, city: string, address: string, house: string, housing: string, office: string}]
  field :code_form_fso, type: Array #[{okpo: integer, okved: integer, okato: integer, okfs: integer, okopf: integer, okogu: integer, oktmo: integer}]
  field :licenses, type: Array #[{type_of: string, kind_of: string, num: string, date: date, valid: date, issue_by: string}]
  field :controls, type: Array #[{name: string, composition: string, credentials: string}]
  field :charter_capital, type: Array #[{payed: integer, registered: integer}]
  field :affiliates, type: Array #[string,string]
  field :codeword, type: String #Blah-blah-blah
  field :consent, type: Mongoid::Boolean

end
