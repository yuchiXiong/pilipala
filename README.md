# README

## `yuchi.xiong.top.rails`
基于 `rails` 构建的博客后端。

## 菜鸡日记 - 记录项目里那些新的尝试

### 1. `JBuilder`: 灵活简便的 `JSON` 构造器
`JBuilder` 属实不应该是一个陌生的东西，从我最早接触 `rails 5.0` 时，它就已经默认的呆在了 `Gemfile` 里了，但是我一次都没有使用过。
项目的第一天，尝试使用了 `jbuilder` 构建 `api` 响应，这里有个非常有意思的小故事，我们通常会在 `views` 目录里构建名为 `*.json.jbuilder` 的 `JSON` 模板，它的工作方式看起来就和 `erb` 没有什么太大的区别。
不过当你需要请求获得数据时，需要在请求路径后添加 `.json`，否则将无法找到对应的模板，就像下面这样：
~~~ shell script
// restful api
Get         /blogs
Get         /blogs/:id
Post        /blogs
Put/Patch   /blogs/:id
Delete      /blogs/:id

// fetch json
Get         /blogs.json
Get         /blogs/:id.json
Post        /blogs.json
Put/Patch   /blogs/:id.json
Delete      /blogs/:id.json
~~~

当然有些洁癖的开发者（比如我）一点都不希望路径后面接上一个 `.json` ，它看起来好像数据就是直接写死在服务器上的一样……经过测试发现，在路径后面增加一个参数 `format:json` 也是可以的，那么你可以使用一种比较简单粗暴的方法如下：
~~~ ruby
namespace :api format: 'json' do
  ...
end

# or
Get         /blogs?format=json
Get         /blogs/:id?format=json
Post        /blogs?format=json
Put/Patch   /blogs/:id?format=json
Delete      /blogs/:id?format=json
~~~
我们在 `routes` 默认指定格式为 `json` ，或者添加一个参数……不过这样其实还是不优雅。
实际上我们只需要告诉 `rails` 我们需要的是 `json` 数据即可，因此我在客户端编写了如下代码：
~~~ javascript
import axios from 'axios';

const instance = axios.create({
    ...
    headers: {
        'Accept': 'application/json'
    }
});

export default instance;
~~~
当配置了公共的请求头之后，就不需要编写冗余的参数了。

### 1.5 `JBuilder` && `erb/slim`: 一套 `controller`，同时拥抱视图与 `api`
这一条续接上一条关于 `JBuilder` 讲。
故事的起因是我找了本 《rails tutorial6》给公司的实习生读，在某一章节我看到关于 `rails g scaffold` 命令的输出中有如下片段：
~~~ shell script
$ rails generate scaffold User name:string email:string
    ......
    invoke erb
        create app/views/users
        create app/views/users/index.html.erb
        create app/views/users/edit.html.erb
        create app/views/users/show.html.erb
        create app/views/users/new.html.erb
        create app/views/users/_form.html.erb
    invoke jbuilder
        create app/views/users/index.json.jbuilder
        create app/views/users/show.json.jbuilder
        create app/views/users/_user.json.jbuilder
    ......
~~~
我个人平时是会用 `rails` 提供的一些脚手架工具的，比如 `rails g controller/model/migration` 等等，但是几乎从来没有用过 `scaffold` 这个命令。
让我比较意外的点就在于它同时生成了 `jbuilder` 文件和 `erb` 文件，通常我会认为一个 `controller` 如果不是 `render json`（当然也可以是其它格式，如 `xml`） 就是 `render html`，因此当两个模板同时出现的时候，我稍微有点疑惑了。
于是乎自己尝试了一下，发现这个地方真的是 `amazing` ……
当一个 `controller` 的基类是 `ActionController::Base` 时，它一样可以 `render json` 就像下面这样，过去我们曾编写了大量的这样的代码。
~~~ ruby
controller SonController < FatcherController
    def index
        render json: {message: 'success'}
    end
end
~~~
当我们使用 `jbuilder` 时，构造 `json` 的能力得到了极大的提升，你完全可以写出如下代码，它看起来就和写 `erb/slim` 没有什么区别——生命一个变量，在视图里用于渲染。
~~~ ruby
# controller
controller SonController < FatcherController
    def show
        @blog = Blog.find(params[:id])
    end
end

# erb
<ul>
    <li><%= @blog.title %></li>
    <li><%= @blog.content %></li>
</ul>

# jbuilder
json.blog @blog, :title, :content
~~~
在这一层基础上，你只需要告诉 `rails` 你需要的是什么，`rails` 便可以对应返回给你 `json\html` 。


### 2. `MiniTest` && `TDD`
项目的第一天，试图尝试使用 `TDD` 来让代码变得更健壮，然而似乎并没有领悟到精髓，不过至少有了基础的接口测试后，不太担心改动导致接口无法工作。

### 3. `Mina`: 自动化部署
因为时常需要进行调整，而且分支的维护上又较为繁琐，所以干脆加入了自动化部署，因为也不是第一次弄了，所以很快就弄好了，不过这次又有一些新发现。
`mina` 使用 `rvm` 的话是需要设定 `rvm_use_path` 的，这个东西的值一般来说就是服务器上的 `rvm` 安装目录。不知道有没有小伙伴发现一个现象：
~~~ shell script
which rvm
~~~
在我的印象中，输出的目录应该类似这样：`home/user/.rvm/bin/rvm`。但是如果你使用 `home/user/.rvm/bin/rvm use 2.5.7`，你会看到那一坨恶心的 `not a function` 提示。
~~~ shell script
RVM is not a function, selecting rubies with 'rvm use ...' will not work.

You need to change your terminal emulator preferences to allow login shell.
Sometimes it is required to use `/bin/bash --login` as the command.
Please visit https://rvm.io/integration/gnome-terminal/ for an example.
~~~
而当你使用 `home/user/.rvm/scripts/rvm use 2.5.7` 时，一切都挺好……
所以我说了这么多……其实是想说，这里的 `rvm_use_path` 设置的目录不要直接上服务器 `which rvm` 然后就复制过来了……记得改成 `scripts` 目录。

另外自动化部署是使用 `ssh` 无密登录服务器的，这个过程需要将本地的 `id_rsa.pub` 复制到部署服务器对应账户的 `.ssh/authorized_keys` 文件中。我的实践经历中，4次有3次复制过去都没有办法免密登录……
所以这里更换了一个更靠谱的方法：`ssh-copy-id` 命令。
~~~ shell script
ssh-copy-id -i ./id_rsa.pub account@domain_or_server_ip
~~~