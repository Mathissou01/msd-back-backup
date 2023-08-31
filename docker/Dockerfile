FROM nginx:alpine

RUN apk add --no-cache openssl

## Configure basic authentication protection
ENV MSD_BASIC_AUTH_USER username
ENV MSD_BASIC_AUTH_PASS changeme
ENV MSD_BASIC_AUTH_MSG  MSD-BACK
ENV NGINX_ENVSUBST_OUTPUT_DIR=/etc/nginx/includes/

COPY docker/basic-auth.conf /etc/nginx/templates/10-basic-auth.conf.template
COPY --chmod=100 ./docker/basicauth.sh /docker-entrypoint.d/99-basic-auth.sh

## Copy default configuration (includes every .conf file in /etc/nginx/includes)
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

## Copy application and static routes configuration
COPY out /usr/share/nginx/html
COPY next-routes.conf /etc/nginx/includes/20-next-routes.conf
