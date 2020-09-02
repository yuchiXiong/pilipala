require 'ali/oss'

class BlogPhotosController < ApplicationController

  def create
    @blog = Blog.find(params[:blogId])
    unless %w[image/gif image/jpeg image/png].include? params[:file].content_type
      raise FormatNotSupport
    end
    uploader = BlogPhotoUploader.new(params[:blogId])
    uploader.store!(params[:file])
    @url = uploader.to_s
  end

end
