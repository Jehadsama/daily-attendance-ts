FROM node:20.11.1 as npminstall
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
FROM mhart/alpine-node:slim-20.11.1
WORKDIR /src-app
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && apk add curl
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone
COPY --from=npminstall /tmp/app/node_modules /src-app/node_modules

ENTRYPOINT ["node", "./src/jobs/sch.js"]