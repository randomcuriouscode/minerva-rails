class CreateEnts < ActiveRecord::Migration[5.1]
  def up
    create_table :ents do |t|
      t.string :title
      t.text :body
      t.integer :journal_id
      t.timestamps
    end
    say "Created ents table"
  end
 
  def down
    drop_table :ents
  end
end