class Api::BlogPhotosController < ApiController

  # * POST /api/u/:space_name/blogs/:id/photos
  # * 上传图片至markdown
  def create
    @blog = Blog.find(params[:blogId])
    raise FormatNotSupport unless %w[image/gif image/jpeg image/png].include? params[:file].content_type

    uploader = BlogPhotoUploader.new(params[:blogId])
    uploader.store!(params[:file])
    @url = uploader.to_s
  end

end