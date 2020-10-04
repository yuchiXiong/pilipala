require 'redcarpet'
require 'redcarpet/render_strip'

module BlogsHelper

  def render_markdown(content)
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, extensions = {})
    markdown.render(content)
  end

  def render_strip_down(content)
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::StripDown)
    markdown.render(content)
  end
end
