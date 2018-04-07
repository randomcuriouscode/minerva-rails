require "application_responder"

class ApplicationController < ActionController::Base
  self.responder = ApplicationResponder
  respond_to :html

  protect_from_forgery with: :exception

  before_action :show_flash

  private

  def show_flash
    flash.now[:notice] = "Found the about page!" if request.path == '/pages/about'
  end
end
