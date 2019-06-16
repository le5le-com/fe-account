# le5le-account

le5le 登录和用户中心前端。

# 框架依赖

css UI 库：<a href="https://github.com/le5le-com/le5le-ui" target="_blank">le5le-ui</a>
angular 组件库：<a href="https://github.com/le5le-com/le5le-components" target="_blank">le5le-components</a>
angular 数据中心服务：<a href="https://github.com/le5le-com/le5le-store" target="_blank">le5le-store</a>

# 开发环境

## 1.安装 nodejs

https://nodejs.org/en/

## 2.安装依赖库

- (c)npm install -g yarn
- yarn

### yarn 错误提示：

warning There appears to be trouble with your network connection.Retrying...

### 解决办法：

npm config set registry https://registry.npm.taobao.org  
npm config set disturl https://npm.taobao.org/dist

【注意】该设置影响 npm publish。还原默认设置： 删除或注释 C:\Users\user\.npmrc

## 3.开发调试

运行 npm start 命令即可进行本地开发调试，使用开发环境数据。

运行 npm run prod 命令也是本地开发调试，使用生成环境数据。

# 编译

生产环境编译：  
npm run build  
编译后的生产文件在 dist 文件夹下。
