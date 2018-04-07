class CreateJournals < ActiveRecord::Migration[5.1]
  def up
    create_table :journals do |t|
      t.string :title
      t.timestamps
    end
    say "Created journals table"
  end
 
  def down
    drop_table :journals
  end
end