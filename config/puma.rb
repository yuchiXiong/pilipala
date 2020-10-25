port 3000

if %w[production].include? ENV['RAILS_ENV']
  app_root = '/home/yuchi/yuchi.xiong.top.rails/shared'
  pidfile "#{app_root}/tmp/pids/puma.pid"
  state_path "#{app_root}/tmp/pids/puma.state"
  bind "unix://#{app_root}/tmp/sockets/puma.sock"
  activate_control_app "unix://#{app_root}/tmp/sockets/pumactl.sock"
  daemonize true
  workers 2
  threads 8, 16
  prune_bundler
  stdout_redirect "#{app_root}/log/puma_access.log", "#{app_root}/log/puma_error.log", true
else
  threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }
  threads threads_count, threads_count

  # Specifies the `environment` that Puma will run in.
  environment ENV.fetch("RAILS_ENV") { "development" }

  # Specifies the `pidfile` that Puma will use.
  pidfile ENV.fetch("PIDFILE") { "tmp/pids/server.pid" }

  # Specifies the number of `workers` to boot in clustered mode.
  # Workers are forked webserver processes. If using threads and workers together
  # the concurrency of the application would be max `threads` * `workers`.
  # Workers do not work on JRuby or Windows (both of which do not support
  # processes).
  #
  # workers ENV.fetch("WEB_CONCURRENCY") { 2 }

  # Use the `preload_app!` method when specifying a `workers` number.
  # This directive tells Puma to first boot the application and load code
  # before forking the application. This takes advantage of Copy On Write
  # process behavior so workers use less memory.
  #
  # preload_app!

  # Allow puma to be restarted by `rails restart` command.
  plugin :tmp_restart
end