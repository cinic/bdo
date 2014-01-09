module Admin::PostsHelper
  def posts_edit_smth_path(post)
    case post._type.to_s.downcase
      when "issuerevent" then edit_admin_posts_issuer_event_path(post)
      when "companyevent" then edit_admin_posts_company_event_path(post)
    end
  end

  def posts_smth_path(post)
    case post._type.to_s.downcase
      when "issuerevent" then admin_posts_issuer_event_path(post)
      when "companyevent" then admin_posts_company_event_path(post)
    end
  end
 
  def posts_smths_path(post)
    case post._type.to_s.downcase
      when "issuerevent" then admin_posts_issuer_events_path
      when "companyevent" then admin_posts_company_events_path
    end
  end
end