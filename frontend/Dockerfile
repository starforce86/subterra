FROM node:19.4-alpine

# upload scripts
COPY ./scripts/entrypoint.sh /

WORKDIR /app

COPY . .

ENTRYPOINT ["/entrypoint.sh"]