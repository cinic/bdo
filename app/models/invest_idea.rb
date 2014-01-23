class InvestIdea < Post
  field :body, type: String
  field :period, type: String
  field :tool, type: String
  field :marketplace, type: String
  field :expected_profit, type: Integer
  field :risk, type: Integer
  field :liquidity, type: Integer
  field :percentage, type: Integer
  field :release, type: Mongoid::Boolean, default: false
  validates :body, :period, :tool, :marketplace, :expected_profit, :risk, :liquidity, :percentage, presence: true
end