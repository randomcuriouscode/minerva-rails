class JournalController < ActionController::Base

	def createJournal # POST /journals/
		@journal = Journal.create(:title => params[:journal][:title])
	end

	def postEntry # POST /journals/{id}/entry JSON reqdata
		@today_date = Date.today.to_s
		@journal = Journal.find(:created_at => today_date)
		@name = params[:journal][:name]
		@contents = params[:journal][:contents]
		@entry = journal.ents.create(:name => @name, :contents => @contents)

		respond_to do |format|
    		msg = { :status => "ok", :message => @entry.id }
    		format.json { render :json => msg }
		end
	end

	def getAllJournals # GET /journals/all
		@journals = Journal.all

		respond_to do |format|
			 format.json { render :json => @journals }
	 	end
	end

	def getJournals # GET /journals/title query 'title'
		@journals = Journal.where(:title => params[:journal][:title])

		respond_to do |format|
			 format.json { render :json => @journals }
	 	end
	end

	def getJournal # GET /journal/ query 'id'
		@journal = Journal.find(:id =>  params[:journal][:id])

		respond_to do |format|
			 format.json { render :json => @journal }
	 	end
	end

	def updateEntry # PUT /entry/{entry id}

	end

	def getFullEntry # GET /entry/{entry id}
		@entry = Ent.find(:id => params[:entry][:id])

		respond_to do |format|
			 format.json { render :json => @entry }
	 	end
	end

end