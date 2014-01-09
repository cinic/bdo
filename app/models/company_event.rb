class CompanyEvent < Post
  field :body, type: String
  validates :body, presence: true
end