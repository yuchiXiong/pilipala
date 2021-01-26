class EditorController < ApplicationController
  layout 'application_react'

  def index
    gon.currentUser = current_user
  end
end