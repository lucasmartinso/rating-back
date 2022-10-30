FROM node 

WORKDIR /usr/src/

COPY . . 

RUN npm i 

RUN npm run build 

RUN npx prisma migrate dev 

EXPOSE 5000 

CMD ["npm","start"]
