FROM node:12.18.2-alpine3.12

RUN apk add graphviz \
            ttf-freefont

COPY package.json tsconfig.json /

RUN yarn && \
    yarn global add @rediagram/cli

WORKDIR /workdir

CMD [ "rediagramc" ]
