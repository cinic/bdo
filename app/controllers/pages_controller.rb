# encoding: utf-8
class PagesController < ApplicationController
  include HighVoltage::StaticPage
  
  before_filter :set_cookies, :set_params, :init_pages_data

  def create
    @prospect = Prospect.new(prospect_params) || {}
    @prospect.ip = request.remote_ip
    @prospect.city = get_city || "Москва" #Выпилить Москву перед релизом на продакшен
    @prospect.url = get_cookies_url

    respond_to do |format|
      if @prospect.save
        #format.html { redirect_to @prospect, notice: 'Prospect was successfully created.' }
        #format.json { render json: @prospect, status: :created, location: @prospect }
        #ProspectMailer.notification(@prospect, "Thanks for registration").deliver
        format.html { redirect_to request.referer, notice: 'Prospect was successfully created.'}
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
        cookies[:from] = request.refferer
      end
    end

    def prospect_params
    	params.require(:prospect).permit(:first_name, :last_name, :patronymic, :email, :mobile, :consent)
    end

    def init_pages_data
      if current_page.include?('index')
        @news_list = CompanyEvent.all
        @idea_list = InvestIdea.all
      end
    end
end