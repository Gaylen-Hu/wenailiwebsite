#!/usr/bin/env bash
set -Eeuo pipefail

project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$project_dir"
mkdir -p logs

# Cron does not load the interactive shell profile, so load the Node version
# manager explicitly before running the Apostrophe task.
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [[ -s "$NVM_DIR/nvm.sh" ]]; then
  set +u
  . "$NVM_DIR/nvm.sh"
  nvm use --silent
  set -u
fi

export NODE_ENV=production

# Avoid overlapping runs if a previous database update takes longer than the
# five-minute cron interval.
if command -v flock > /dev/null 2>&1; then
  exec 9>"$project_dir/logs/.scheduled-publishing.lock"
  flock -n 9 || exit 0
fi

exec node app @apostrophecms/scheduled-publishing:update
