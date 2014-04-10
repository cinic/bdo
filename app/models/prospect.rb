# encoding: utf-8
class Prospect
  include Mongoid::Document
  include Mongoid::Timestamps
  field :first_name, type: String
  field :last_name, type: String
  field :patronymic, type: String
  field :email, type: String
  field :mobile, type: String
  field :city, type: String
  field :url, type: Array
  field :visit, type: Array
  field :campaign, type: String
  field :crm_id, type: String
  field :ip, type: String
  field :product, type: String
  field :request_type, type: String
  field :referrer, type: String
  field :consent, type: Mongoid::Boolean

  validates :consent, inclusion: { in: [true] }
  validates :first_name, format: { with: /[[:alpha:]]/ }
  validates :last_name, format: { with: /[[:alpha:]]/ }
  validates :patronymic, format: { with: /[[:alpha:]]/ }, allow_blank: true
  validates :mobile, presence: true

  def send_to_clients(params = {}, procedure, anketa_type)
    client = TinyTds::Client.new(:username => 'phpuser', :password => 'phpuser', :host => '10.48.34.220', :database => "opendb", :port => "1433")

    names = "uch1,uch2,uch3,uch4,uch5,uch6,uch7,uch8,uch9,uch10,uch11,uch12,uch13,uch14,uch15,uch16,uch17"
    values = "''#{params['last_name']}'',''#{params['first_name']}'','''','''',''#{params['city']}'','''',''#{params['mobile']}'',''#{params['email']}'',''1'',''0'',''1'',''0'','''',''1'',''1'',''0'',''http://localhost:3000''"

    query = "EXEC #{procedure} @anketa_type ='#{anketa_type}' ,@anketa_names ='#{names}' ,@anketa_values ='#{values}' ,@is_insert = 1"
    
    result = client.execute(query)
    client.close
  end

  def send_to_crm(params = {})
    data = {
      :id => "NEW",
      :prospectSourceType => "Our own sales network", 
      :"web-RequestType" => params["request_type"],
      :lastName => params["last_name"],
      :firstName => params["first_name"],
      :middleName => params["patronymic"],
      :alternatePhone => params["mobile"],
      :emailAddress => params["email"],
      :comment => "",
      :bestCallTime => "",
      :callbackDatetime => "",
      :city => params[:city],
      :comments => "Тестирование WSDL",
      :organization => "",
      :"web-RequestSourceURL" => params["first_requested_page"],
      :"web-RequestHTTPReferer" => params["referer"],
      :formSourceURL => params["form_url"],
      :"web-RequestProductName" => params["product"]
    }

    path = File.join(Rails.root, "config", "crm", "prospect.test1.wsdl")
    client = Savon.new(path)

    operation = client.operation(:OPN_spceSales_spcProspective_spcContact_spcWebsite_spcImport, :OPN_spceSales_spcProspective_spcContact_spcWebsite_spcImport, :ProspectiveContactWebsiteImport)
    operation.body = {:Pospective_spcContact => {:listOfeSalesProspectiveContact => {:listMgmtProspectiveContact => [data]}}}

    response = operation.call 
    #id = response.body[:prospective_contact_website_import_response][:prospective_spc_contact_spc_insert_spc_id]

    case params["request_type"]
    when "Join Quik Demo"
      clients_result = send_to_clients(params, "dbo.lk_anketa_handler", "saturn.ChildrenDB.dbo.ChReg")
    when "Juridical Affiliate Contact"
      clients_result = send_to_clients(params, "dbo.lk_anketa_handler", "saturn.ChildrenDB.dbo.ChReg")
    end
        
  end

  private

    def self.service_params
      {
        :id => "NEW",
        :prospectSourceType => "Our own sales network", 
        :"web-RequestType" => "Active Sale",
        :lastName => "Test",
        :firstName => "Test",
        :middleName => "Test",
        :alternatePhone => "+79119998877",
        :emailAddress => "andreev-a@open.ru",
        :comment => "Тестирование WSDL",
        :bestCallTime => "",
        :callbackDatetime => "",
        :city => "Москва",
        :comments => "Тестирование WSDL",
        :organization => "",
        :"web-RequestSourceURL" => "HTTP RequestSourceURL",
        :"web-RequestHTTPReferer" => "HTTP RequestHTTPReferer",
        :formSourceURL => "formSourceURL",
        :"web-RequestProductName" => "Имя продукта"
      }
    end

end