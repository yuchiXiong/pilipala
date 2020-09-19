require 'ali/oss'

class BlogPhotoUploader < CarrierWave::Uploader::Base

  # * 保存前记录文件cache id
  before :store, :remember_cache_id
  # * 保存后将文件上传至OSS并删除本地的文件
  after :store, :save_to_ali_oss
  # * 保存后删除文件cache
  after :store, :delete_tmp_dir

  storage :file

  # * 实例化时指定对应的文章id
  def initialize(blog_id)
    super
    @blog_id = blog_id
  end

  # * 文件存放路径
  def store_dir
    "uploads/#{Rails.env}/blog_photos/#{@blog_id}"
  end

  # * 将文件上传至OSS
  def save_to_ali_oss
    oss    = Ali::Oss.new
    client = oss.client
    bucket = client.get_bucket('assets-blog-xiongyuchi')
    bucket.put_object("#{self.store_dir}/#{self.filename}", :file => self.path)
    File.delete(self.path)
  end

  # * 记录文件cache id
  def remember_cache_id
    @cache_id_was = cache_id
  end

  # * 删除文件cache
  def delete_tmp_dir
    if @cache_id_was.present? && @cache_id_was =~ /\A[\d]+\-[\d]+(\-[\d]{4})?\-[\d]{4}\z/
      FileUtils.rm_rf(File.join(root, cache_dir, @cache_id_was))
    end
  end

  # * 自定义文件名
  def filename
    @name ||= "#{timestamp}-#{super}" if original_filename.present? and super.present?
  end

  def timestamp
    var = :"@#{mounted_as}_timestamp"
    model.instance_variable_get(var) or model.instance_variable_set(var, Time.current.to_i)
  end
end
