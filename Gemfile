source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~>4.0.0'

# Sass, coffescript, fontawesome, modernizr
gem 'sass-rails', '~> 4.0.0'
gem 'font-awesome-sass'
gem 'modernizr-rails'
gem 'coffee-rails', '~> 4.0.0'
gem 'jquery-rails'
gem 'jquery-ui-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
#gem 'turbolinks'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

gem 'slim-rails'
gem 'high_voltage'
gem 'actionpack-action_caching'
gem 'actionpack-page_caching'
gem 'mongoid', github: 'mongoid/mongoid'
gem 'mongoid_slug', github: 'digitalplaywright/mongoid-slug'
gem 'ipgeobase', github: 'cinic/ipgeobase'
gem 'newrelic_rpm'
# for WysiWyg
gem "ckeditor"
gem 'paperclip', github: 'crowdtap/paperclip'
gem 'mongoid-paperclip', :require => 'mongoid_paperclip'
# end for wysiwyg
gem 'bson'
gem 'bson_ext'
## Gems for back-end services connect
# Havymetal SOAP Client
gem 'savon', github: 'savonrb/savon'
# Mssql connection
gem 'tiny_tds'
gem 'activerecord-sqlserver-adapter', github: 'nextgearcapital/activerecord-sqlserver-adapter', branch: 'rails-4'
## End gems for back-end services connect
# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 1.2'

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', require: false
end

gem 'puma', :group => [:development, :test, :staging]
gem 'foreman'
gem 'rack-rewrite'

# Use ActiveModel has_secure_password
gem 'bcrypt-ruby', :require => 'bcrypt'

# Use unicorn as the app server
group :production do
  gem 'unicorn'
end
group :development, :test do
  gem 'rspec'
  gem 'rspec-rails', '~> 3.0.0.beta'
  gem 'factory_girl_rails'
  #gem 'mongoid-rspec', '>= 1.6.0', github: 'evansagge/mongoid-rspec'
  gem 'email_spec'
  gem 'fuubar'
end
group :test do
  gem 'faker'
  gem 'capybara'
  gem 'guard-rspec'
  gem 'launchy'
  gem 'database_cleaner'
end

# Use Capistrano for deployment
group :development do
  gem 'capistrano', '~> 3.0'
  gem 'capistrano-bundler'
  gem 'capistrano-rails', '~> 1.1'
  gem 'capistrano-rvm', github: 'capistrano/rvm'
end

# Use debugger
gem 'debugger', group: [:development, :test, :staging]
