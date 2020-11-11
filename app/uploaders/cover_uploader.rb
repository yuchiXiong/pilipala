class CoverUploader < CarrierWave::Uploader::Base

  # # * 保存前记录文件cache id
  # before :store, :remember_cache_id
  # # * 保存后将文件上传至OSS并删除本地的文件
  # after :store, :save_to_ali_oss
  # # * 保存后删除文件cache
  # after :store, :delete_tmp_dir

  storage :file

  def store_dir
    "cover/#{Rails.env}/blogs/#{model.id}/"
  end

  # * 将文件上传至OSS
  def save_to_ali_oss(file)
    oss    = Ali::Oss.new
    client = oss.client
    bucket = client.get_bucket('assets-blog-xiongyuchi')
    bucket.put_object("#{store_dir}#{filename}", file: path)
    File.delete(path)
  end

  # * 记录文件cache id
  def remember_cache_id(new_file)
    @cache_id_was = cache_id
  end

  # * 删除文件cache
  def delete_tmp_dir(new_file)
    if @cache_id_was.present? && @cache_id_was =~ /\A[\d]+\-[\d]+(\-[\d]{4})?\-[\d]{4}\z/
      FileUtils.rm_rf(File.join(root, cache_dir, @cache_id_was))
    end
  end

end
