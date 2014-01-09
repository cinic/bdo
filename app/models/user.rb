class User
	include Mongoid::Document
	include Mongoid::Timestamps

	attr_accessor :password
	before_save :encrypt_password


	field :email, type: String
	field :full_name, type: String
	field :password_salt, type: String
	field :password_hash, type: String
	field :role, type: String
	field :last_sign_in_at, type: Time
	field :last_sign_in_ip, type: String

	validates_presence_of :password, :on => :create
	validates_presence_of :email
	validates_uniqueness_of :email

	def self.authenticate(email, password)
		user = User.where({email: email}).first
		if user && user.password_hash == BCrypt::Engine.hash_secret(password, user.password_salt)
			user
		else
			nil
		end
	end

	def encrypt_password
		if password.present?
			self.password_salt = BCrypt::Engine.generate_salt
			self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)
		end
	end

end
