module ApplicationHelper
  # Пункты меню для меню подраздела
  # Активный пункт удаляется из коллекции
  def li_with_link_to_unles_current(name, options = {}, html_options = {}, &block)
    content_tag(:li, link_to(name, options, html_options)) unless current_page?(options)
  end

  # Пункт меню с классом для активного пункта
  # Ссылка кликабельна всегда
  def link_to_with_current_class(name, current_class = nil, options = {}, html_options = {}, &block)
    html_options[:class] << " " + current_class if current_page?(options) || request.path.include?(options)
    link_to(name, options, html_options)
  end

  
  def sub_menu
    unless request.path[1..-1].count("/").to_i < 1
      template_name = request.path[1..-1].split("/").first.to_s
      "shared/sub-menu/" + template_name if lookup_context.exists?(template_name, ["shared/sub-menu"], true)
    end
  end
end