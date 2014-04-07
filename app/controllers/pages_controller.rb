# encoding: utf-8
class PagesController < ApplicationController
  include HighVoltage::StaticPage
  
  before_filter :set_cookies, :set_params, :init_pages_data

  def create
    @prospect = Prospect.new(prospect_params) || {}
    @prospect.ip = request.remote_ip
    @prospect.city = get_city || "Москва" #Если не определилось, то Москва
    @prospect.url = get_cookies_url
    
    if @prospect.valid? && (Rails.env.production? or Rails.env.staging?)
      crm_service_params = Prospect.service_params
      crm_service_path = File.join(Rails.root, "config", "crm", "prospect.wsdl")
      crm_service_client = Savon.new(crm_service_path)
      crm_service_operation = crm_service_client.operation(:OPN_spceSales_spcProspective_spcContact_spcWebsite_spcImport, :OPN_spceSales_spcProspective_spcContact_spcWebsite_spcImport, :ProspectiveContactWebsiteImport)
      crm_service_operation.body = {:Pospective_spcContact => {:listOfeSalesProspectiveContact => {:listMgmtProspectiveContact => [crm_service_params]}}}

      crm_service_response = crm_service_operation.call 
      @prospect.crm_id = crm_service_response.body[:prospective_contact_website_import_response][:prospective_spc_contact_spc_insert_spc_id]
    end
    

    respond_to do |format|
      if @prospect.save
        #format.html { redirect_to @prospect, notice: 'Prospect was successfully created.' }
        #format.json { render json: @prospect, status: :created, location: @prospect }
        ProspectMailer.notification(@prospect, "Thanks for registration").deliver
        format.html { redirect_to request.referer, notice: 'Prospect was successfully created.'}
        format.js   {}
        format.json { render json: @prospect, status: :created }
        cookies.delete(:url)
      else
        format.html { render template: current_page }
        format.json { render json: @prospect.errors, status: :unprocessable_entity }
      end
    end
  end

  private

    def get_city
      ip_meta = Ipgeobase.lookup(request.remote_ip)
      ip_meta[:city] || ip_meta[:region] || ip_meta[:country] unless ip_meta == false
    end
    def get_cookies_url
      cookies[:url].split(',')
    end

    def set_params
      @prospect = Prospect.new
    end

    def set_cookies
      if cookies[:url]
        cookies[:url] = {value: cookies[:url]  + ',' + params[:id], expires: 7.day.from_now} if cookies[:url].split(',').last != params[:id]
      else
        cookies[:url] = {value: params[:id], expires: 7.day.from_now}
      end
    end

    def prospect_params
    	params.require(:prospect).permit(:first_name, :last_name, :patronymic, :email, :mobile, :consent, :request_type, :product_name, :product)
    end

    def init_pages_data
      @news_list = CompanyEvent.all.limit(2).desc(:created_at) if current_page.include?('index')
      @idea_list = InvestIdea.all.limit(2).desc(:created_at) if current_page.include?('index')
    end
end