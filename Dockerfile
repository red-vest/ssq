FROM node

ADD . /app/

ENV PORT 3000
WORKDIR /app
RUN yarn
EXPOSE 3000

CMD ["npm","start"]
