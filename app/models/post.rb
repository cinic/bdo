class Post
  include Mongoid::Document
  include Mongoid::Timestamps
  field :date, type: Time, default: DateTime.now
  field :title, type: String
  field :published, type: Mongoid::Boolean, default: false
  field :author, type: String

  #scope :issuer_events, where("content._type" => "IssuerEvent")
  validates :title, :author, presence: true
end
