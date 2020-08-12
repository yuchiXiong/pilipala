class Blog < ApplicationRecord
  belongs_to :user

  def to_builder
    Jbuilder.new do |blog|
      blog.(self, :id, :title, :description, :content, :cover)
    end
  end

end
