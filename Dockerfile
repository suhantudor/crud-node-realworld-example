FROM node:16.14.0-alpine as app-build

LABEL app="Crud Node Real World Example"

LABEL author="Tudor Suhan"

# Stage 1: build application

# Create app directory
RUN mkdir -p /src

# Set current directory
WORKDIR /src

# Copy package.json
COPY package*.json /src

# Copy yarn.lock
COPY yarn.lock /src

# Copy .npmrc
COPY .npmrc /src

# Clear cache
RUN yarn cache clean

# Install app dependencies
RUN yarn install

# Remove .yarnrc
RUN rm -f .npmrc

# Bundle app source
COPY . .

# Build app
RUN yarn build

# Stage 2: run build application
FROM node:16.14.0-alpine as app-exec

# Create app directory
RUN mkdir -p /src

# Set current directory
WORKDIR /src

# Copy build
COPY --from=app-build /src/dist /src/dist

# Copy package.json
COPY package*.json /src

# Copy yarn.lock
COPY yarn.lock /src

# Copy .npmrc
COPY .npmrc /src

# Install global dependencies
RUN yarn global add cross-env

# Install app dependencies
RUN yarn install --production

# Run app
CMD yarn run start:dev
