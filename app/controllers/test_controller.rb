class TestController < ApplicationController

	def test
		puts "the params are :" + params.inspect
	end
end
