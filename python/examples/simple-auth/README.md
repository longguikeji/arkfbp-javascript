# simple auth


Simple Auth是一个简单的注册、登录的模块


## 接口

### 登录

POST /login

username: string
password: string

### 登出

GET /logout

### 注册

POST /register

username: string
password: string


## 数据结构

### 用户表

id | username | password

### Token表

user_id | token

