require 'redcarpet'
require 'redcarpet/render_strip'

module BlogsHelper

  DEFAULT_OPTIONS = {
    no_styles:                    true,
    hard_wrap:                    true,
    autolink:                     true,
    fenced_code_blocks:           true,
    strikethrough:                true,
    underline:                    true,
    superscript:                  false,
    footnotes:                    false,
    highlight:                    false,
    tables:                       true,
    lax_spacing:                  true,
    space_after_headers:          true,
    disable_indented_code_blocks: true,
    no_intra_emphasis:            true,
    quote:                        true
  }

  def render_markdown(content)
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, DEFAULT_OPTIONS)
    "<article class='markdown-article'>#{markdown.render(content)}</article>"
  end

  def render_strip_down(content)
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::StripDown)
    markdown.render(content)
  end

end
