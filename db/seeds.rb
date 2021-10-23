# require 'nokogiri'
# require 'rest-client'
#
# BASE_URL = 'https://jianshu.com'
#
# body = RestClient.get(BASE_URL).body
#
# html = Nokogiri(body).css('li > .content')
#
# html.map do |content|
#   title = content.css('a')[0].children.text
#
#   address = content.css('a')[0]['href']
#
#   article_body = RestClient.get(BASE_URL + address).body
#
#   article = Nokogiri(article_body).css('article').children
#
#   unless Blog.find_by_title(title)
#     Blog.create!(user_id: User.first.id, title: title, content: article, released: true)
#     puts "已添加文章《#{title}》"
#   end
#
# end

BASE_PATH = '../../yuchi.xiong.blogs'

blogs_dir = Dir.open(BASE_PATH)

# def get_content(path)
#   File.open(path)
# end


def get_markdown(dir_path = BASE_PATH, result = [])

  Dir.open(dir_path).map do |file_name|
    next if %w[. .. .git README.md toc_by_category.md].include? file_name

    if File.directory?("#{dir_path}/#{file_name}")
      get_markdown("#{dir_path}/#{file_name}", result)
    elsif file_name.include? '.md'
      result.push({
                      title: file_name[0..-4],
                      content: File.open("#{dir_path}/#{file_name}").read
                  })
    end
  end

  result
end

Blog.destroy_all
get_markdown.reverse.map do |blog|
  Blog.create!(title: blog[:title], content: blog[:content], user_id: User.first.id, released: true)
end

puts "已导入 #{Blog.count} 篇博文"