module Admin::BaseHelper

  #def active_menu?(path, path_right=request.path)
  #  (URI::parse(path).path == path_right) rescue false
  #end

  #def sidebar_menu
  #  [
  #    "Дашбоард",   about_pages_path, 
  #    "Публикации", careers_pages_path, 
  #    "Contact", contact_pages_path
  #  ].each_slice(2).map do |name, path|
  #    content_tag(:li, link_to(name, path), 
  #      :class => (active_menu?(path) ? "active_page" : ""))
  #  end.join('').html_safe
  #end
  
  def li_with_link_to_unles_current_with_class(name, class_for_current = nil, options = {}, html_options = {}, &block)
    if current_page?(options)
      if block_given?
        block.arity <= 1 ? capture(name, &block) : capture(name, options, html_options, &block)
      else
        content_tag :li, class: class_for_current do
          raw('<div class="pointer"><i class="arrow"></i><i class="arrow_border"></i></div>') + # content_tag выводит только последнюю строку, поэтому делаем конкатенацию
          content_tag(:span, ERB::Util.html_escape(name))
        end
      end
    else
      content_tag(:li, link_to(name, options, html_options))
    end
  end
end