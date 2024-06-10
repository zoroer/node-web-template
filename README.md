# node-web-template
> node-web-template是一个Koa2 + MVC + Mongodb + Redis 搭建的Node Web的标准项目模板。模板对日常登录注册的基本功能都做了内嵌，并对开发日志分割统计、接口统一拦截、返回等中间件也做了集成。做到了开箱即用！

## 技术栈
Node V16 + Koa2 + MVC设计模式 + Mongodb + Mongoose + Redis

## 模板特色功能：
1. 依据Koa2搭建的Node Web标准模板。
2. 对常用的模块（登录/注册/用户查询等）做了内嵌，开箱即用！
3. 模板封装了项目开发中常用的中间件：日志分割，接口统一拦截，统一返回封装，JWT登录等，避免重复造轮子。
4. 集成pm2常用配置，一键管理node应用。

## 项目运行

1. 拉取模板：
* 全局安装 uni-web-cli 并选择"node-web"即可按提示使用：
uni-web-cli：https://github.com/zoroer/uni-web-cli.git
* 直接拉取通用模板：
node-web-template：git clone https://github.com/zoroer/node-web-template.git

2. cd "xxx" xxx为node-web-template所在的目录

3. npm install

4. npm run start

> **Tips：项目运行前 请先安装并启动 mongoDB(port:28017，启动服务时注意)，保证数据的正常存取和所有功能正常使用！**

## 代码结构
```
.
├── LICENSE
├── README.md
├── app
│   ├── controller
│   │   ├── login.js
│   │   ├── test.js
│   │   └── user.js
│   ├── global.js
│   ├── helper
│   │   ├── captcha.js
│   │   ├── fetch.js
│   │   └── index.js
│   ├── middleware
│   │   ├── gateway.js
│   │   ├── index.js
│   │   └── resFilter.js
│   ├── model
│   │   ├── test.js
│   │   └── user.js
│   ├── plugin
│   │   └── autoEnhanceIndex.js
│   ├── router
│   │   ├── index.js
│   │   ├── login.js
│   │   ├── test.js
│   │   └── user.js
│   └── service
│       ├── login.js
│       ├── test.js
│       └── user.js
├── build
│   └── new_tag.sh
├── conf
│   └── index.js
├── index.js
├── logger.js
├── logs
│   ├── app
│   │   ├── logs.log
│   └── web
│       ├── logs.log
├── mongoDB
│   └── index.js
├── package-lock.json
├── package.json
├── screenshots
│   └── node-web.png
├── web
│   └── testAPI.html

```
