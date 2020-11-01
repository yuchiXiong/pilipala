class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :blogs, dependent: :destroy

  enum sex: %i[保密 男 女]

  def resource_errors
    result = []
    errors.messages.each do |model, messages|
      messages.each do |msg|
        result.push "#{model} #{msg}"
      end
    end
    result
  end

end
