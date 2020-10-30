require 'ali/content_scan'

class Blog < ApplicationRecord
  include Discard::Model
  belongs_to :user

  # * 审核结果
  enum scan_result: { pass: 0, review: 1, block: 2 }

  # * 所有处于发布状态的文章
  scope :visible, -> { where({ released: true, discarded_at: nil }) }
  default_scope { order(updated_at: :desc) }

  # * 自动审核并进行标识
  # before_save :content_scan

  # * 博客是否可访问
  def readable?
    !discarded? && released
  end

  private

  # * 内容审核
  def content_scan
    text   = title + content
    result = []
    (1..((text.size / 9000) + 1)).map do |i|
      result.push(Ali::ContentScan.new.scan_text(text[(i - 1) * 9000...i * 9000]))
    end
    self.scan_result = 'pass' if result.include? 'pass'
    self.scan_result = 'review' if result.include? 'review'
    self.scan_result = 'pass' if result.include? 'block'
  end
end
