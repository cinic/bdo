set :application, 'bdo'
set :repo_url, 'git@github.com:cinic/bdo.git'

#ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }
set :scm, :git

set :format, :pretty
set :log_level, :debug
set :pty, true

set :linked_files, %w{config/mongoid.yml}
set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets public/upload public/assets}

set :default_env, { rvm_bin_path: '~/.rvm/bin' }
set :keep_releases, 5
set :use_sudo, false

namespace :deploy do
  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      if test "[ -f #{current_path}/tmp/pids/unicorn.pid ]"
        execute :kill, "-s USR2 `cat #{current_path}/tmp/pids/unicorn.pid`"
      else
        #execute "#{fetch(:bundle_binstubs)}/unicorn", "-c #{release_path}/config/unicorn.rb -D -E #{fetch(:stage)}"
        execute "cd #{current_path} && (RAILS_ENV=#{fetch(:stage)} ~/.rvm/bin/rvm default do bundle exec unicorn_rails -c #{current_path}/config/unicorn.rb -E #{fetch(:stage)})"
      end
    end
  end
  
  desc 'copy ckeditor nondigest assets'
  task :copy_nondigest_assets do
    on roles(:app) do
      run "cd #{current_path} && #{rake} RAILS_ENV=#{rails_env} ckeditor:create_nondigest_assets"
    end
  end
  
  after 'deploy:assets:precompile', 'copy_nondigest_assets'
  after :finishing, "deploy:cleanup"
end
