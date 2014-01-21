# encoding: utf-8
class Prospect
  include Mongoid::Document
  include Mongoid::Timestamps
  field :first_name, type: String
  field :last_name, type: String
  field :patronymic, type: String
  field :email, type: String
  field :mobile, type: Integer
  field :city, type: String
  field :url, type: Array
  field :visit, type: Array
  field :campaign, type: String
  field :crm_id, type: String
  field :ip, type: String
  field :product, type: String
  field :referrer, type: String
  field :consent, type: Mongoid::Boolean

  validates :consent, inclusion: { in: [true], message: ' – необходимо отметить.' }
  validates :first_name, format: { with: /[[:alpha:]]/, message: 'должно состоять только из букв.'}
  validates :last_name, format: { with: /[[:alpha:]]/, message: 'должно состоять только из букв.' }
  validates :patronymic, format: { with: /[[:alpha:]]/, message: 'должно состоять только из букв.' }, allow_blank: true
  validates :mobile, numericality: { only_integer: true, message: 'должен состоять только из цифр.' }

end