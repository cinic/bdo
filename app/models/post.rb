class Post
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Slug
  field :date, type: Time, default: DateTime.now
  field :title, type: String
  field :published, type: Mongoid::Boolean, default: false
  field :author, type: String
  slug  :title, history: true

  #scope :issuer_events, where("content._type" => "IssuerEvent")
  validates :title, :author, presence: true
end
