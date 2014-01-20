class InvestIdea < Post
  field :body, type: String
  field :period, type: String
  field :tool, type: String
  field :marketplace, type: String
  field :yield, type: Integer
  field :risk, type: Integer
  field :liquidity, type: Integer
  field :percentage, type: Integer
  field :release, type: Mongoid::Boolean, default: false
  validates :body, :period, :tool, :marketplace, :yield, :risk, :liquidity, :percentage, presence: true
end