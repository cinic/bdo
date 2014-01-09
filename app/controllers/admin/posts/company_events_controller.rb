class Admin::Posts::CompanyEventsController < Admin::BaseController
  before_action :set_admin_posts_company_event, only: [:show, :edit, :update, :destroy]

  # GET /admin/posts/company_events
  # GET /admin/posts/company_events.json
  def index
    @admin_posts_company_events = CompanyEvent.all
  end

  # GET /admin/posts/company_events/1
  # GET /admin/posts/company_events/1.json
  def show
  end

  # GET /admin/posts/company_events/new
  def new
    @admin_posts_company_event = CompanyEvent.new
  end

  # GET /admin/posts/company_events/1/edit
  def edit
  end

  # POST /admin/posts/company_events
  # POST /admin/posts/company_events.json
  def create
    @admin_posts_company_event = CompanyEvent.new(admin_posts_company_event_params)
    @admin_posts_company_event.author = @current_user.full_name

    respond_to do |format|
      if @admin_posts_company_event.save
        format.html { redirect_to [:admin,:posts,@admin_posts_company_event], notice: 'Company event was successfully created.' }
        format.json { render action: 'show', status: :created, location: [:admin,:posts,@admin_posts_company_event] }
      else
        format.html { render action: 'new' }
        format.json { render json: @admin_posts_company_event.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin/posts/company_events/1
  # PATCH/PUT /admin/posts/company_events/1.json
  def update
    respond_to do |format|
      if @admin_posts_company_event.update(admin_posts_company_event_params)
        format.html { redirect_to [:admin,:posts,@admin_posts_company_event], notice: 'Company event was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @admin_posts_company_event.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/posts/company_events/1
  # DELETE /admin/posts/company_events/1.json
  def destroy
    @admin_posts_company_event.destroy
    respond_to do |format|
      format.html { redirect_to [:admin,:posts,admin_posts_company_events_url] }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_admin_posts_company_event
      @admin_posts_company_event = CompanyEvent.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def admin_posts_company_event_params
      params.require(:company_event).permit(:title,:body,:date,:published)
    end
end
