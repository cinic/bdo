class LegalEntitiesController < ApplicationController

  # GET /legal_entities
  # GET /legal_entities.json
  def index
    @legal_entity = LegalEntity.new
  end

  # POST /legal_entities
  # POST /legal_entities.json
  def create
    @legal_entity = LegalEntity.new(legal_entity_params)

    respond_to do |format|
      if @legal_entity.save
        format.html { redirect_to @legal_entity, notice: 'Legal entity was successfully created.' }
        format.json { render action: 'show', status: :created, location: @legal_entity }
      else
        format.html { render action: 'new' }
        format.json { render json: @legal_entity.errors, status: :unprocessable_entity }
      end
    end
  end

  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def legal_entity_params
      params.require(:legal_entity).permit(:org_name_full, :org_name_short, :org_name_full_en, :org_name_short_en, :bic, :taxpayer_id, :taxpayer_crr, :reg_place, :contact_person => [], :representatives => [], :founders => [], :beneficiaries => [], :addresses => [], :code_form_fso => [], :licenses => [], :controls => [])
    end
end
