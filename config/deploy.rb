require 'mina/bundler'
require 'mina/rails'
require 'mina/git'
require 'mina/rvm'
require 'mina/puma'
require 'mina/logs'
require 'mina/multistage'

# * server settings
set :application_name, 'blog for yuchi'
set :domain, 'blog.xiongyuchi.top'
set :deploy_to, '/home/yuchi/yuchi.xiong.top.rails'
set :user, 'yuchi'
set :rvm_use_path, '/home/yuchi/.rvm/scripts/rvm'
set :port, '22'
set :forward_agent, true # SSH forward_agent.

# * git settings
set :repository, 'git@github.com:yuchiXiong/yuchi.xiong.top.rails.git'
set :branch, 'master'

# * env settings
set :rails_env, 'production'

# * file settings
set :puma_config, -> { "#{fetch(:current_path)}/config/puma.rb" }
set :shared_files, fetch(:shared_files, []).push('config/database.yml', 'config/master.key', 'config/credentials.yml.enc')
# set :compiled_asset_path, 'public/assets'
# set :packs_path, 'public/packs'
set :node_modules_path, 'node_modules'
# set :shared_dirs, fetch(:shared_dirs, []).push('log', 'tmp/cache', fetch(:compiled_asset_path), fetch(:packs_path), fetch(:node_modules_path))
set :shared_dirs, fetch(:shared_dirs, []).push('log', 'tmp/cache', fetch(:node_modules_path))

task :remote_environment do
  invoke :'rvm:use', 'ruby-2.5.7'
end

task :setup do
  # command %{rbenv install 2.3.0 --skip-existing}
  command %[mkdir -p "#{fetch(:shared_path)}/tmp/sockets"]
  command %[chmod g+rx,u+rwx "#{fetch(:shared_path)}/tmp/sockets"]
  command %[mkdir -p "#{fetch(:shared_path)}/tmp/pids"]
  command %[chmod g+rx,u+rwx "#{fetch(:shared_path)}/tmp/pids"]
  command %[mkdir -p "#{fetch(:shared_path)}/log"]
  command %[chmod g+rx,u+rwx "#{fetch(:shared_path)}/log"]
  command %[mkdir -p "#{fetch(:shared_path)}/public/uploads"]
  command %[chmod g+rx,u+rwx "#{fetch(:shared_path)}/public/uploads"]
  command %[mkdir -p "#{fetch(:shared_path)}/node_modules"]
  command %[chmod g+rx,u+rwx "#{fetch(:shared_path)}/node_modules"]
  command %[mkdir -p "#{fetch(:shared_path)}/storage"]
  command %[chmod g+rx,u+rwx "#{fetch(:shared_path)}/storage"]
  command %[mkdir -p "#{fetch(:shared_path)}/config"]
  command %[chmod g+rx,u+rwx "#{fetch(:shared_path)}/config"]
end

task :deploy do

  deploy do

    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    invoke :'bundle:install'
    invoke :'rails:db_migrate'
    # * 自动化部署打包严重影响了部署的速度
    # invoke :'rails:assets_precompile'
    invoke :'deploy:cleanup'

    on :launch do
      in_path(fetch(:current_path)) do
        invoke :'rvm:use', 'ruby-2.5.7'
        invoke :'puma:phased_restart'
      end
    end
  end

end
