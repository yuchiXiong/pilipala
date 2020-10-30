class EditorController < ApplicationController
  layout 'editor_for_react'

  def index
    gon.currentUser = current_user
  end
end