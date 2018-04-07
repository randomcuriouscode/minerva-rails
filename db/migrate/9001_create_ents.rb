class CreateEnts < ActiveRecord::Migration[5.1]
  def up
    create_table :ents do |t|
      t.string :title
      t.text :body
      t.belongs_to :journal, index:true # one entry belongs to a journal
      t.timestamps
    end
    say "Created ents table"
  end
 
  def down
    drop_table :ents
  end
end