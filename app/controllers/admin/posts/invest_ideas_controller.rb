class Admin::Posts::InvestIdeasController < Admin::BaseController
before_action :set_admin_posts_invest_idea, only: [:show, :edit, :update, :destroy]

  # GET /admin/posts/invest_ideas
  # GET /admin/posts/invest_ideas.json
  def index
    @admin_posts_invest_ideas = InvestIdea.all
  end

  # GET /admin/posts/invest_ideas1
  # GET /admin/posts/invest_ideas/1.json
  def show
  end

  # GET /admin/posts/invest_ideas/new
  def new
    @admin_posts_invest_idea = InvestIdea.new
  end

  # GET /admin/posts/invest_ideas/1/edit
  def edit
  end

  # POST /admin/posts/invest_ideas
  # POST /admin/posts/invest_ideas.json
  def create
    @admin_posts_invest_idea = InvestIdea.new(admin_posts_invest_idea_params)
    @admin_posts_invest_idea.author = @current_user.full_name

    respond_to do |format|
      if @admin_posts_invest_idea.save
        format.html { redirect_to [:admin,:posts,@admin_posts_invest_idea], notice: 'Invest idea was successfully created.' }
        format.json { render action: 'show', status: :created, location: [:admin,:posts,@admin_posts_invest_idea] }
      else
        format.html { render action: 'new' }
        format.json { render json: @admin_posts_invest_idea.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin/posts/invest_ideas/1
  # PATCH/PUT /admin/posts/invest_ideas/1.json
  def update
    respond_to do |format|
      if @admin_posts_invest_idea.update(admin_posts_invest_idea_params)
        format.html { redirect_to [:admin,:posts,@admin_posts_invest_idea], notice: 'Invest idea was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @admin_posts_invest_idea.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/posts/invest_ideas/1
  # DELETE /admin/posts/invest_ideas/1.json
  def destroy
    @admin_posts_invest_idea.destroy
    respond_to do |format|
      format.html { redirect_to admin_posts_invest_ideas_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_admin_posts_invest_idea
      @admin_posts_invest_idea = InvestIdea.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def admin_posts_invest_idea_params
      params.require(:invest_idea).permit(:title,:body,:date,:published,:tool,:period,:marketplace,:expected_profit,:risk,:liquidity,:percentage,:release)
    end
end
