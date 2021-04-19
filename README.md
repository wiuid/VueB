### 项目介绍

本项目是前端

项目名：webraVueA

演示地址：https://admina.webra.top/

前端：Vue+ElementUI+其他各类组件、图表

后端：SpringBoot+SpringSecurity+JWT+其他各类组件

后端地址：https://github.com/wiuid/webraAdminA

### 详细文档：https://www.yuque.com/webra/admina

### 功能

- 支持动态生成菜单
- 操作、登录、错误日志记录
- 用户管理
- 部门管理
- 权限（角色）管理
- 服务监控
- 岗位管理
- 公告管理
- 等等

### 构建

- 确保node环境正常
- 修改后端接口
- - .env.production 中的 `VUE_APP_API_BASE_URL = ` ，务必携带协议头"https | http"
- npm run build
- 打包到web服务的工作目录，解压即可访问

- 另外需要自行配置nginx做转发代理！
