class EntController < ActionController::Base
	before_action :__init__

	def __init__
		@log = Logger.new($stderr)
		@log.level = Logger::DEBUG   # or Logger::INFO
	end

	def postEntry # POST /journals/{id}/entry JSON reqdata
		@today_date = Date.today.to_s
		@journal = Journal.find_or_create_by(:id => params[:id])
		@name = params[:ent][:title]
		@body = params[:ent][:body]
		@log.debug("PostEntry : Body received: #{@body}")
		@entry = @journal.ents.create(:title => @name, 
								:body => @body, 
								:journal_id => @journal.id)

		respond_to do |format|
    		msg = { :status => "ok", :message => @entry.id }
    		format.json { render :json => msg }
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