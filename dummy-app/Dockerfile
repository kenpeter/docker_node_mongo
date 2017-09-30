FROM mhart/alpine-node:latest

# Copy dep to /tmp
ADD package.json /tmp/package.json

# Go inside tmp and install dep
# we have /tmp/node_modules
RUN cd /tmp && npm install

# make dir /opt/app
# copy dep into /opt/app 
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# working dir
WORKDIR /opt/app

# Add dummy-app (need to remove node_modules) to /opt/app
ADD . /opt/app

# 3000 port
EXPOSE 3000

# CMD vs RUN
# Run will create new img, while cmd didn't
CMD ["npm", "start"]
