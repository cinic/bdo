class NewsItemsController < ApplicationController
  before_action :set_news, only: [:show]

  def index
    @news_list = CompanyEvent.all.limit(5).desc(:created_at)
  end

  def show
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_news
      @news_item = CompanyEvent.find(params[:id])
    end

end
