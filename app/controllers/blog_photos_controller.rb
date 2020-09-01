require 'ali/oss'

class BlogPhotosController < ApplicationController

  def create
    uploader = BlogPhotoUploader.new(params[:id])
    uploader.store!(params[:file])
    @url = Ali::Oss.new.client.get_bucket('assets-blog-xiongyuchi').object_url(uploader.to_s[1..-1])
  end

end
