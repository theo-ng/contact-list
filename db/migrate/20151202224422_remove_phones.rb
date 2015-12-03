class RemovePhones < ActiveRecord::Migration
  def change
    drop_table :phones
    add_column :contacts, :phone, :string, default: ''
  end
end
