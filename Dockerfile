# Install dependencies only when needed
FROM docker.io/node:lts-alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Set environment variables for the build
ARG NEXT_PUBLIC_CONTENTFUL_SPACE_ID
ARG NEXT_PUBLIC_CONTENTFUL_DELIVERY_API_KEY
ENV NEXT_PUBLIC_CONTENTFUL_SPACE_ID=$NEXT_PUBLIC_CONTENTFUL_SPACE_ID
ENV NEXT_PUBLIC_CONTENTFUL_DELIVERY_API_KEY=$NEXT_PUBLIC_CONTENTFUL_DELIVERY_API_KEY


# Set the working directory inside the container
WORKDIR /app

# Copy package.json 
COPY .npmrc package.json ./

# Install project dependencies
RUN npm install -ci

# Copy Files
COPY . .

#Install project
RUN npx nx build westfield-rise -prod

# Start a new build stage with a clean image
FROM node:lts-alpine 

WORKDIR /app

# Copy only the built app and node_modules from the previous stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist/apps/westfield-rise ./

# Set the necessary environment variables (if you have any)
#!!!!!!!!!Important!!!!!!!!!
#This needs to be moved into AWS Secrets Manager
ENV SES_EMAIL_SUBJECT_PREFIX="Contact us form submission from"
ENV NEXT_PUBLIC_CONTENTFUL_SPACE_ID=$NEXT_PUBLIC_CONTENTFUL_SPACE_ID
ENV NEXT_PUBLIC_CONTENTFUL_DELIVERY_API_KEY=$NEXT_PUBLIC_CONTENTFUL_DELIVERY_API_KEY

# I port on which the container will listen for connections
EXPOSE 80

# R Next.js app
CMD ["npx", "next", "start", "-p", "80"]
