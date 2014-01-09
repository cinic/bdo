# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
user = User.create({email: 'cinic.rus@gmail.com', password: 'password', role: 'admin', full_name: 'Alexander Andreev'})
puts 'New user created: ' << user.full_name