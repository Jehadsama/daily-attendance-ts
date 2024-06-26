FROM node:20.15-slim as npminstall
LABEL maintainer="Jehadsama<339364351@qq.com>"
ARG nodejs_org_mirror=http://registry.npm.taobao.org/mirrors/node
ARG npm_config_registry=https://registry.npm.taobao.org
ENV NODEJS_ORG_MIRROR=${nodejs_org_mirror} NPM_CONFIG_REGISTRY=${npm_config_registry}
WORKDIR /tmp/app
# 拷贝 package.json 到工作跟目录下
COPY package.json ./
# 安装依赖
RUN npm install --production --verbose && ls node_modules/


# for `npm` just rm prefix `base-` from tag
FROM node:20.15-slim
WORKDIR /src-app
COPY --from=npminstall /tmp/app/node_modules /src-app/node_modules

ENTRYPOINT ["NODE_ENV=prod", "node", "./src/jobs/sch.js"]