class Ckeditor::Asset
  include Ckeditor::Orm::Mongoid::AssetBase
  include Mongoid::Paperclip
  include Ckeditor::Backend::Paperclip

  def self.server_url
    OpenBroker::Application.config.action_controller.asset_host ||= ""
  end
end
