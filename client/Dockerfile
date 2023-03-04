FROM node:19-alpine3.16 as builder
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
#EXPOSE 3000
#CMD ["npm", "start"]
RUN npm run build

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
#COPY nginx.conf etc/nginx/conf.d/default.conf
EXPOSE 80
