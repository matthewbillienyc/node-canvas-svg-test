FROM ubuntu:18.04

# Force Docker to build without user input
ENV DEBIAN_FRONTEND=noninteractive

# Update apt universe
RUN sed 's/main$/main universe/' -i /etc/apt/sources.list

# Basic packages
RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    git-core \
    zip \
    vim \
    sysstat \
    build-essential \
    curl \
    libcairo2-dev \
    libjpeg8-dev \
    tmpreaper \
    xfsprogs \
    ntp \
    python2.7

# Packages for Node
RUN apt-get install -y \
    g++ \
    libssl-dev \
    apache2-utils

# Packages for Canvas
RUN apt-get install -y \
    librsvg2-dev \
    libpango1.0-dev \
    libgif-dev

# Need to create a symlink for node gyp
RUN ln -s /usr/bin/python2.7 /usr/bin/python

# Install node/npm
RUN set -x && \
    curl -L -o node.tar.gz "https://nodejs.org/download/release/v6.11.0/node-v6.11.0-linux-x64.tar.gz" && \
    mkdir -p /usr/src/node && \
    tar -xzf node.tar.gz -C /usr/src/node --strip-components=1 && \
    rm node.tar.gz && \
    ln -s /usr/src/node/bin/node /usr/local/bin/node && \
    ln -s /usr/src/node/bin/npm /usr/local/bin/npm && \
    npm install npm@5.1.0 -g

VOLUME ~/node-canvas-svg-test
WORKDIR ~/node-canvas-svg-test

COPY package-lock.json package-lock.json
COPY package.json package.json

RUN npm install
