set :application, 'bdo'
set :repo_url, 'git@github.com:cinic/bdo.git'

set :scm, :git

set :format, :pretty
set :log_level, :debug
set :pty, true

set :linked_files, %w{config/mongoid.yml}
set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets public/upload public/assets}

set :default_env, { rvm_bin_path: '~/.rvm/bin' }
set :keep_releases, 3
set :use_sudo, false


namespace :foreman do
  desc "Export the Procfile to Ubuntu's upstart scripts"
  task :export do
    on roles(:app), in: :sequence, wait: 5 do
      within release_path do
        with rails_env: fetch(:rails_env) do
          sudo '-E', SSHKit.config.command_map[:bundle], :exec, :foreman, :export, :upstart, "/etc/init",
               "-f Procfile",
               "-a #{fetch(:app_name)}",
               "-u #{fetch(:user)}",
               "-l #{shared_path.join('log')}"
        end
      end
    end
  end

  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      execute "sudo start #{fetch(:app_name)} || sudo restart #{fetch(:app_name)}"
    end
  end

  desc "Start the application services"
  task :start do
    on roles(:app), in: :sequence, wait: 5 do
      sudo :start, fetch(:app_name)
    end
  end

  desc "Stop the application services"
  task :stop do
    on roles(:app), in: :sequence, wait: 5 do
      sudo :stop, fetch(:app_name)
    end
  end
end

namespace :deploy do
      # on OS X the equivalent pid-finding command is `ps | grep '/puma' | head -n 1 | awk {'print $1'}`
      #run "(kill -s SIGUSR1 $(ps -C ruby -F | grep '/puma' | awk {'print $2'})) || #{sudo} service #{fetch(:app_name)} restart"

  after :finishing, "deploy:cleanup"
  after :updated, 'foreman:export'
  after :publishing, 'foreman:restart'
  #after :finishing, "foreman:export"
  #after :finishing, "foreman:restart"
end
