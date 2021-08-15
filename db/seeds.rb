require 'nokogiri'
require 'rest-client'

BASE_URL = 'https://jianshu.com'

body = RestClient.get(BASE_URL).body

html = Nokogiri(body).css('li > .content')

html.map do |content|
  title = content.css('a')[0].children.text

  address = content.css('a')[0]['href']

  article_body = RestClient.get(BASE_URL + address).body

  article = Nokogiri(article_body).css('article').children

  unless Blog.find_by_title(title)
    Blog.create!(user_id: User.first.id, title: title, content: article, released: true)
    puts "已添加文章《#{title}》"
  end

end