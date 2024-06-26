FROM node:20.15-slim as npminstall
LABEL maintainer="Jehadsama<339364351@qq.com>"

ARG nodejs_org_mirror=https://registry.npmmirror.com/node
ARG npm_config_registry=https://registry.npmmirror.com
ENV NODEJS_ORG_MIRROR=${nodejs_org_mirror} NPM_CONFIG_REGISTRY=${npm_config_registry}
WORKDIR /tmp/app
# 拷贝 package.json 到工作跟目录下
COPY package.json ./
# 安装依赖
RUN npm install --production --verbose && ls node_modules/


# for `npm` just rm prefix `base-` from tag
FROM node:20.15-slim
ENV NODE_ENV=prod
WORKDIR /src-app
COPY . ./
COPY --from=npminstall /tmp/app/node_modules /src-app/node_modules

ENTRYPOINT ["node", "src/jobs/sch.js"]