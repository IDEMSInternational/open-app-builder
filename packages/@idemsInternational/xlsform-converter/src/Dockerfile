# Use base image with both node and python installed and compatible with

# https://github.com/enketo/enketo-transformer#prerequisites
# https://github.com/xlsform/pyxform
FROM nikolaik/python-nodejs:python3.9-nodejs14-alpine

# Add deps for node-gyp
# https://stackoverflow.com/questions/54428608/docker-node-alpine-image-build-fails-on-node-gyp
RUN apk add --no-cache make g++

WORKDIR /app

# Install python and node dependencies to convert forms
RUN pip3 install pyxform && npm install enketo-transformer

COPY . .

RUN mkdir /app/forms

# Convert xlsform to xml using python and then xml to enketo-json using node
CMD python3 xlsform-to-xform.py && node xform-to-enketo.js && echo "Complete"

# Debug
# ENTRYPOINT ["tail", "-f", "/dev/null"]