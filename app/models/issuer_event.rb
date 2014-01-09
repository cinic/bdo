class IssuerEvent < Post
  field :body, type: String
  validates :body, presence: true
end