json.array!(@admin_posts_invest_ideas) do |admin_posts_invest_idea|
  json.extract! admin_posts_invest_idea, :id
  json.url admin_posts_invest_idea_url(admin_posts_invest_idea, format: :json)
end
