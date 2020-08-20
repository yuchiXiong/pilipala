# README

## `yuchi.xiong.top.rails`
基于 `rails` 构建的博客后端。

## 菜鸡日记

### 2020/08/09

**JBuilder**
项目第一天，使用了 `jbuilder` 构建 `api` 响应，默认情况下如果请求端未指定 `accept` ， 则不能保证渲染 `.json.jbuilder` 模板。

~~~ ruby
namespace :api format: 'json' do
  ...
end
~~~

**MiniTest && TDD**
项目第一天，试图尝试使用 `TDD` 来让代码变得更健壮，然而似乎并没有领悟到精髓，不过至少有了基础的接口测试后，不太担心改动导致接口无法工作。

**MiniTest && TDD**
项目第不知道多少天，重新梳理了一遍，发现漏掉了好多逻辑，处理了csrf和api关系下的验证机制