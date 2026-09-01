FROM nginx:alpine
LABEL maintainer="breach-checker-lab"
LABEL date="12."
RUN apk add --no-cache nodejs npm && npm install -g htmlhint
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html
RUN htmlhint /usr/share/nginx/html/index.html
EXPOSE 80
