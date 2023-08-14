#!/bin/sh

set -e

ME=$(basename $0)

entrypoint_log() {
    if [ -z "${NGINX_ENTRYPOINT_QUIET_LOGS:-}" ]; then
        echo "$ME: $@"
    fi
}

entrypoint_log "Creating Basic Authentication password file"
echo "$MSD_BASIC_AUTH_USER:$(openssl passwd $MSD_BASIC_AUTH_PASS)" >> /etc/nginx/auth

entrypoint_log "Password entry created for user $MSD_BASIC_AUTH_USER"
exit 0
