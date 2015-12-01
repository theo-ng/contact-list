class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :firstname
      t.string :lastname
      t.string :email
    end

    create_table :phones do |t|
      t.string :number
      t.string :label
      t.references :contacts
    end
  end
end
