class Contact < ActiveRecord::Base
  validates :email, uniqueness: true, presence: true
  validates :firstname, presence: true
  validates :lastname, presence: true
  validates :phone, numericality: true

end