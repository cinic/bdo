set :application, 'bdo'
set :repo_url, 'git@github.com:cinic/bdo.git'
set :app_name, "bdo_#{fetch(:stage)}"
set :user, "deployer"

ask :branch, "add-soap-client-gem"
set :scm, :git

set :format, :pretty
set :log_level, :debug
set :pty, true

set :linked_files, %w{config/mongoid.yml}
set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets public/upload}

set :default_env, { rvm_bin_path: '~/.rvm/bin' }
set :keep_releases, 3
#set :use_sudo, false

namespace :deploy do
  desc "Export the Procfile to Ubuntu's upstart scripts"
  task :export do
    on roles(:app) do
      run "cd #{current_path} && #{sudo} foreman export upstart /etc/init -a #{app_name} -u #{user} -l /var/log/nginx/#{app_name}"
    end
  end

  desc "Start the application services"
  task :start do
    on roles(:app) do
      run "#{sudo} service #{app_name} start"
    end
  end

  desc "Stop the application services"
  task :stop do
    on roles(:app) do
      run "#{sudo} service #{app_name} stop"
    end
  end

  desc "Restart the application services"
  task :restart do 
    on roles(:app) do
      run "#{sudo} service #{app_name} start || #{sudo} service #{app_name} restart"
    end
  end

  after :finishing, "deploy:cleanup"
  after :finishing, "deploy:export"
  after :finishing, "deploy:restart"
end
