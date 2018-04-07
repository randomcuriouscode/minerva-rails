class JournalController < ActionController::Base
	before_action :__init__

	def __init__
		@log = Logger.new($stderr)
		@log.level = Logger::DEBUG   # or Logger::INFO
	end


	def createJournal # POST /journals/
		@journal = Journal.create(:title => params[:journal][:title])
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
end