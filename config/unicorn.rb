# Unicorn configuration file to be running by unicorn_init.sh with capistrano task
# read an example configuration before: http://unicorn.bogomips.org/examples/unicorn.conf.rb
# 
# working_directory, pid, paths - internal Unicorn variables must to setup
# worker_process 4              - is good enough for serve small production application
# timeout 30                    - time limit when unresponded workers to restart
# preload_app true              - the most interesting option that confuse a lot of us,
#                                 just setup is as true always, it means extra work on 
#                                 deployment scripts to make it correctly
# BUNDLE_GEMFILE                - make Gemfile accessible with new master
# before_fork, after_fork       - reconnect to all dependent services: DB, Redis, Sphinx etc.
#                                 deal with old_pid only if CPU or RAM are limited enough
#
# config/server/production/unicorn.rb
 
 
app_path          = "/home/rails/apps/bdo/current"
 
working_directory "#{app_path}"
pid               "/home/unicorn/pids/unicorn.pid"
stderr_path       "/home/unicorn/log/unicorn.log"
stdout_path       "/home/unicorn/log/unicorn.log"
 
listen            "/home/unicorn/sockets/unicorn.production.sock"
worker_processes  2
timeout           30
preload_app       true
 
 
before_exec do |_|
  ENV["BUNDLE_GEMFILE"] = File.join(app_path, 'Gemfile')
end