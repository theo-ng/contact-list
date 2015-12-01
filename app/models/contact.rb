class Contact < ActiveRecord::Base
  validates :email, uniqueness: true, presence: true
  validates :firstname, presence: true
  validates :lastname, presence: true
  has_many :phones

  def to_s
    contact_info =  "#{id} | #{firstname} #{lastname}: #{email}"
      phones.each { |phone| contact_info << phone.to_s } if phones.length > 0
    contact_info
  end
end