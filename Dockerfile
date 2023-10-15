FROM alpine:latest as production
RUN apk --no-cache add nodejs ca-certificates
WORKDIR /root/
COPY .env ./
COPY --from=builder /usr/src/app ./
CMD [ "node", "./build/index.js" ]