env = ENV["RAILS_ENV"] || "development"
if env == "production"
  root = "/home/cinic/bdo/production/current"
  working_directory root
  user("cinic","cinic")
  pid "#{root}/tmp/pids/unicorn.pid"
  stderr_path "#{root}/log/unicorn.stderr.log"
  stdout_path "#{root}/log/unicorn.stdout.log"

  listen "#{root}/tmp/sockets/unicorn.sock", :backlog => 64
end
worker_processes 4
timeout 30
preload_app true
GC.respond_to?(:copy_on_write_friendly=) and
  GC.copy_on_write_friendly = true
before_fork do |server, worker|
  old_pid = "#{root}/tmp/pids/unicorn.pid.oldbin"
  if File.exists?(old_pid) && server.pid != old_pid
    begin
      Process.kill("QUIT", File.read(old_pid).to_i)
    rescue Errno::ENOENT, Errno::ESRCH
      # someone else did our job for us
    end
  end
end

# Force the bundler gemfile environment variable to
# reference the capistrano "current" symlink
before_exec do |_|
  ENV["BUNDLE_GEMFILE"] = File.join(root, 'Gemfile')
end