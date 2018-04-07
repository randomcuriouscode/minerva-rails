class EntController < ActionController::Base
	before_action :__init__

	def __init__
		@log = Logger.new($stderr)
		@log.level = Logger::DEBUG   # or Logger::INFO
	end

	def postEntry # POST /journals/{id}/entry JSON reqdata
		@today_date = Date.today.to_s
		@journal = Journal.find(params[:id])
		@name = params[:ent][:title]
		@body = params[:ent][:body]
		@log.debug("PostEntry : Body received: #{@body}")
		@entry = @journal.ents.create(:title => @name, 
								:body => @body, 
								:journal_id => @journal.id)

		respond_to do |format|
    		msg = @entry.id
    		format.json { render :json => msg }
		end
	end

	def updateEntry # PUT /entry/{entry id}
		@entry = Ent.find(params[:id])
		@entry.update_attributes(params.require(:ent).permit(:title, :body))

		respond_to do |format|
    		msg = @entry.id
    		format.json { render :json => msg }
		end
	end

	def getFullEntry # GET /entry/{entry id}
		@log.debug("EntController::getFullEntry: Request: %s" % params.inspect)
		@entry = Ent.find(params[:id])

		respond_to do |format|
			msg = @entry
			format.json { render :json => msg }
	 	end
	end

	def getEntries # Get /entries/:journal_id
		@entries = Ent.order(:created_at => :desc).
					where(:journal_id => params[:journal_id])

		respond_to do |format|
			msg = @entries
			format.json { render :json => msg }
	 	end
	end
end