class InvestIdeaItemsController < ApplicationController
  before_action :set_news, only: [:show]

  def index
    @idea_list = InvestIdea.all.limit(5).desc(:created_at)
  end

  def show
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_news
      @idea_item = InvestIdea.find(params[:id])
    end

end
