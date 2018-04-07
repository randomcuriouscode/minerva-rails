class EntsController < ActionController::Base
	def createEntry # POST /entry/

	end

	def postEntry # POST /journals/{id}/entry
		today_date = Date.today.to_s
		journal = Journal.find(:created_at => today_date)
		name = params[:journal][:name]
		contents = params[:journal][:contents]
		journal.ents.create(:name => name, :contents => contents)
	end

	def getAllJournals # GET /journals/all

	end

	def getJournal # GET /journals/ query 'id' or GET /journals query 'title'

	end
end