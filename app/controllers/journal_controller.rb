class JournalController < ActionController::Base
	before_action :__init__

	def __init__
		@log = Logger.new($stderr)
		@log.level = Logger::DEBUG   # or Logger::INFO
	end


	def createJournal # POST /journals/
		@journal = Journal.create(:title => params[:journal][:title])

		respond_to do |format|
			msg = { :status => "ok", :message => @journal }
			format.json { render :json => msg }
	 	end
	end

	def getAllJournals # GET /journals/all
		@journals = Journal.all

		respond_to do |format|
			msg = { :status => "ok", :message => @journals }
			format.json { render :json => msg }
	 	end
	end

	def searchJournals # POST /journals/search query 'title'
		query = params[:journal][:title]
		@journals = Journal.order(:created_at => :desc).
						where('title like ?', "%#{query}%")

		respond_to do |format|
			msg = { :status => "ok", :message => @journals }
			format.json { render :json => msg }
	 	end
	end
end