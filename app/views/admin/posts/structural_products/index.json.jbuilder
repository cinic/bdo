json.array!(@admin_posts_structural_products) do |admin_posts_structural_product|
  json.extract! admin_posts_structural_product, :id
  json.url admin_posts_structural_product_url(admin_posts_structural_product, format: :json)
end
