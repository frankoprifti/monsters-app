FROM node:18-alpine
WORKDIR /backend
COPY package.json ./
COPY ./prisma prisma
COPY ./src src
RUN npm install
RUN npx prisma generate  
# COPY . .
EXPOSE 3001
CMD ["npm", "start"]
