class Admin::ProspectsController < Admin::BaseController
  def index
    @prospects = Prospect.all
  end

  def show
    @prospect = Prospect.find(params[:id])
  end
end
