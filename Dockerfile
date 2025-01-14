FROM node:18-slim

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN npx tsc --skipLibCheck --noEmit

RUN npx vite build

ENV DOMAIN_NAME="http://localhost:"
ENV API_PORT="8080"
ENV API_URL="${DOMAIN_NAME}${API_PORT}"

EXPOSE 5173

CMD ["npx", "vite", "preview"]
