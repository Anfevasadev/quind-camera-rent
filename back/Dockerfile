FROM node:18

WORKDIR /back/src/app

COPY package*.json ./

# Instalar las dependencias
RUN npm install

COPY . .

# Eliminar la carpeta node_modules y reinstalar las dependencias para asegurar la compatibilidad
RUN rm -rf node_modules && npm install

EXPOSE 3000

CMD ["node", "index.js"]