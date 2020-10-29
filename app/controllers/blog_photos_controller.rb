require 'ali/oss'

class BlogPhotosController < ApplicationController

  # * POST /blog_photos
  def create
    @blog = Blog.find(params[:blogId])
    raise FormatNotSupport unless %w[image/gif image/jpeg image/png].include? params[:file].content_type

    uploader = BlogPhotoUploader.new(params[:blogId])
    uploader.store!(params[:file])
    @url = uploader.to_s
  end

end
