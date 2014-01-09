json.array!(@admin_posts_company_events) do |admin_posts_company_event|
  json.extract! admin_posts_company_event, :id
  json.url admin_posts_company_event_url(admin_posts_company_event, format: :json)
end
