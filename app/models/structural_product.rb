class StructuralProduct < Post
  field :body, type: String
  field :base_active, type: String
  field :price, type: Array, default: Array.new(2)
  field :release_date, type: Time
  field :entry_threshold, type: Integer
  field :currency, type: String
  field :target_yield, type: Integer
  field :capital_protection, type: Integer
  field :maximum_profit, type: Integer
  field :maximum_risk, type: Integer
  field :participation_rate, type: Integer
  field :coupon, type: Integer
  field :release, type: Mongoid::Boolean, default: false
  validates :body, :base_active, :price, :release_date, :entry_threshold, :target_yield, presence: true
end