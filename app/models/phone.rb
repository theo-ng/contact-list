class Phone < ActiveRecord::Base
  validates :contact_id, presence: true
  belongs_to :contact

  def to_s
    " #{label}: #{numbers}"
  end
end