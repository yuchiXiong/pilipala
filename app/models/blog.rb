class Blog < ApplicationRecord
  include Discard::Model
  belongs_to :user
end
