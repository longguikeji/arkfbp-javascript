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

CREATE TABLE users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username CHAR(50) NOT NULL,
    password CHAR(50) NOT NULL,
    name CHAR(50)
)

### Token表

CREATE TABLE tokens(
    user_id INTEGER PRIMARY KEY,
    token CHAR(50) NOT NULL,
)



