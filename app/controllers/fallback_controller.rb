class FallbackController < ActionController::Base
  def index
    render file: "/Users/isabellacostabile/Development/Flatiron-School/phase-5/phase-5-project/client/public/index.html"
  end
end