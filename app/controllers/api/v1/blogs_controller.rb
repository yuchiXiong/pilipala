module Api
  module V1
    class BlogsController < ApiController

      # * GET /api/v1/blogs
      def index
        page = params[:page].to_i || 1

        if page.to_i <= 1
          @blogs = Blog.limit(20)
        end
        @blogs = Blog.offset((page -1) * 20).limit(20)
      end

      # * GET /api/v1/blog/:id
      def show
        @blog = Blog.find(params[:id])
      end

      # * POST /api/v1/blog
      def create
        @blog = Blog.new(blog_params)
        unless @blog.save
          @errors = @blog.errors
        end
      end

      # * DELETE /api/v1/blog/:id
      def destroy
        @blog = Blog.find(params[:id])
        unless @blog.delete
          @errors = @blog.errors
        end
      end

      private

      def blog_params
        params.require(:blog).permit(:title, :content, :description, :cover, :user_id)
      end
    end
  end
end