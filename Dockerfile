#
# BUILD STAGE
#
FROM node:12.16.1 AS build

# Working directory
WORKDIR /app
ARG NPM_TOKEN
ARG NODE_ENV=development

# Add node_modules/.bin to PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install and cache dependencies
COPY package.json package-lock.json .npmrc /app/
RUN npm ci
RUN npm install -g @angular/cli@9

# Add app code
COPY . /app

# TODO: Run tests
#RUN ng test --watch=false
#RUN ng e2e --port 4202

# Build the app
RUN ng build --prod --output-path=dist

# Rip out all of the dev dependencies
RUN npm prune --production

#
# PROD STAGE
#
FROM node:12.16.1 as prod

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/ /app/

EXPOSE 5000

CMD ["node", "--inspect", "bin/www"]