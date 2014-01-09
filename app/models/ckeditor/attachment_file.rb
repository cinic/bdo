class Ckeditor::AttachmentFile < Ckeditor::Asset
  has_mongoid_attached_file :data,
                            :url => "/uploads/attachments/:id/:filename",
                            :path => ":rails_root/public/uploads/attachments/:id/:filename"

  validates_attachment_size :data, :less_than => 10.megabytes
  validates_attachment_presence :data

  def url_thumb
    @url_thumb ||= Ckeditor::Utils.filethumb(filename)
  end
end
