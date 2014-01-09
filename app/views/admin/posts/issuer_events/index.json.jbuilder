json.array!(@admin_posts_issuer_events) do |admin_posts_issuer_event|
  json.extract! admin_posts_issuer_event, 
  json.url admin_posts_issuer_event_url(admin_posts_issuer_event, format: :json)
end
