class Admin::Posts::StructuralProductsController < Admin::BaseController
before_action :set_admin_posts_structural_product, only: [:show, :edit, :update, :destroy]

  # GET /admin/posts/structural_products
  # GET /admin/posts/structural_products.json
  def index
    @admin_posts_structural_products = StructuralProduct.all
  end

  # GET /admin/posts/structural_products1
  # GET /admin/posts/structural_products/1.json
  def show
  end

  # GET /admin/posts/structural_products/new
  def new
    @admin_posts_structural_product = StructuralProduct.new
  end

  # GET /admin/posts/structural_products/1/edit
  def edit
  end

  # POST /admin/posts/structural_products
  # POST /admin/posts/structural_products.json
  def create
    @admin_posts_structural_product = StructuralProduct.new(admin_posts_structural_product_params)
    @admin_posts_structural_product.author = @current_user.full_name

    respond_to do |format|
      if @admin_posts_structural_product.save
        format.html { redirect_to [:admin,:posts,@admin_posts_structural_product], notice: 'Invest idea was successfully created.' }
        format.json { render action: 'show', status: :created, location: [:admin,:posts,@admin_posts_structural_product] }
      else
        format.html { render action: 'new' }
        format.json { render json: @admin_posts_structural_product.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin/posts/structural_products/1
  # PATCH/PUT /admin/posts/structural_products/1.json
  def update
    puts admin_posts_structural_product_params
    respond_to do |format|
      if @admin_posts_structural_product.update(admin_posts_structural_product_params)
        format.html { redirect_to [:admin,:posts,@admin_posts_structural_product], notice: 'Invest idea was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @admin_posts_structural_product.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/posts/structural_products/1
  # DELETE /admin/posts/structural_products/1.json
  def destroy
    @admin_posts_structural_product.destroy
    respond_to do |format|
      format.html { redirect_to admin_posts_structural_products_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_admin_posts_structural_product
      @admin_posts_structural_product = StructuralProduct.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def admin_posts_structural_product_params
      puts params[:structural_product]
      params.require(:structural_product).permit(:title, :body, :date, :published, :base_active, :release_date, :entry_threshold, :currency,
        :target_yield, :capital_protection, :maximum_profit, :maximum_risk, :participation_rate, :coupon, :release, {price: []})
    end
end
