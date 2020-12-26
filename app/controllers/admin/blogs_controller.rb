class Admin::BlogsController < AdminController
  def index
    page = params[:page] || 1
    size = params[:size] || 10
    by = params[:by] || :id
    order = params[:order] || :desc

    @blogs = Blog.unscope(:order).order(by => order).page(page).per(size)
    @pagination = {
      current: page.to_i,
      pageSize: size.to_i,
      total: Blog.count
    }
    render json: {
      blogs: @blogs,
      pagination: @pagination
    }
  end
end