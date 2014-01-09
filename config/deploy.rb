set :application, 'bdo'
set :repo_url, 'git@ac.ifoxy.net:bdo.git'

ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }

set :deploy_to, '/home/cinic/apps/bdo'
set :scm, :git

set :format, :pretty
# set :log_level, :debug
set :pty, true
set :tmp_dir, "/home/cinic/tmp"

set :linked_files, %w{config/mongoid.yml}
#set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets}

set :default_env, { path: "$PATH" }
set :keep_releases, 5
set :use_sudo, false

namespace :deploy do
  %w[start stop restart].each do |command|
    desc "#{command} unicorn server"
    task command do
      on roles(:app) do
        execute "/etc/init.d/unicorn #{command}"
      end
    end
  end

  desc 'Symlink linked files'
  task :linked_files do
    next unless any? :linked_files
    on roles :app do
      execute :mkdir, '-pv', linked_file_dirs(release_path)

      fetch(:linked_files).each do |file|
        target = release_path.join(file)
        source = shared_path.join(file)
        unless test "[ -L #{target} ]"
          if test "[ -f #{target} ]"
            execute :rm, target
          end
          execute :ln, '-s', source, target
        end
      end
    end
  end
  desc 'Check files to be linked exist in shared'
  task :linked_files do
    next unless any? :linked_files
    on roles :app do |host|
      linked_files(shared_path).each do |file|
        unless test "[ -f #{file} ]"
          error t(:linked_file_does_not_exist, file: file, host: host)
          exit 1
        end
      end
    end
  end

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      # Your restart mechanism here, for example:
      unless test "[ -d #{release_path}/tmp ]"
        execute :mkdir, '-pv', release_path.join('tmp')
      end
      execute :touch, release_path.join('tmp/restart.txt')
    end
  end

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      within release_path do
        #execute :rake, 'tmp:cache:clear'
      end
    end
  end

  after :finishing, 'deploy:cleanup'

end
