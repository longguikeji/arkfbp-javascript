# 龙归方舟FBP编程框架

龙归方舟**F**low **B**ased **P**rogramming(**FBP**)编程框架

```
Company: 北京龙归科技有限公司
Author： rock
Date: 20191113
Confidential
```

## 介绍

与传统面向过程以及面向对象编程方式不同，我们引入一种新的面向流程的编程方式，目标使编程的门槛更低，编程的方式更加自然，同时使代码具有更好的可读性以及更简单的调试。

1. 本文代码示例均以Python为例

## 术语

1. Node(节点)
	程序的最小执行单元为节点(Node)
2. 工作流
3. 工作流实例
4. Network

## 语言实现

1. Python
2. Javascript(前端WEB环境以及其它类似宿主环境)
3. NodeJS(服务器端)
4. Golang
5. Rust

## 节点

#### 基础Node类型

1. Start: 开始节点，工作流的起点
2. Stop: 结束节点
3. IF: 条件分支节点
4. API: 调用API节点
5. Function: 任意代码块节点
6. Nop: 空节点，不做任何操作，主要是为了打断前后节点的数据传递流
7. Loop: 循环节点

#### 节点ID

每个节点均有一个固定的id，通过该ID可以找到唯一对应的节点的定义，在手写的时候不应该发生重复的情况

#### 节点实例ID

每个节点在执行的时候会产生一个实例，每个实例也会被设置一个唯一的id。

### Start

Start节点接受一个可选的inputs，对于启用了HTTP协议的情况下，将会将HTTP部分解析出来的参数直接转换成inputs，比如对于HTTP的POST请求，如果Content-Type设置成application/json, body体将会被直接解析成inputs对象。

### Stop

用来标记工作流的退出，next始终为None

### IF

```statement```: IF条件判断语言，可以为function，但必须返回可转BOOL值的结果

```positive_next```: statement返回True的时候下一步执行的节点

```negative_next```: statement返回False的时候下一步执行的节点

### API

API节点用来调用远程API，有两种模式，一种由fbp执行框架直接发起调用，比如：直接发起HTTP请求到远端Github获取Repo列表。另外一种为代理执行模式，仅在API节点中描述远端API的位置即可，常用于当应用部署在ArkOS中的场景，具体的API发起由 APISvr执行。整个的流程为:

1. fbp运行框架发现定义为代理执行的API节点
2. fbp运行框架发送请求到APISvr
3. APISvr收到fbp的请求，处理并发送实际请求到远端API
4. APISvr收到远端API的请求后，处理并将Response发送给fbp端
5. fbp运行框架执行下一节点

属性:

1. Mode: ```direct | proxy```
	direct: 由当前流的执行环境直接执行
	proxy: 如部署在ArkOS中，则由方舟操作系统中的ApiSvr代理执行
2. Application
3. API
4. Method
5. Params

direct call的情况,  示例:

```
mode: 'direct'
application: 'https://api.github.com'
api: '/orgs/longguikeji/repos'
method: 'GET'
params: {
	'name': 'rock'
}
```

代理的情况下，示例:

```
mode: 'delegate'
application: 'arkos://gitlab.01'
api: '/orgs/longguikeji/repos'
method: 'GET'
params: {
	'name': 'rock'
}
```

### Function

该节点用来实现任意的自定义逻辑。

### Nop

空节点，只是为了打断数据流的传递，或者作为Placeholder使用。

### Loop

```init_statement``` : 循环的初始条件

```condition_statement```: 每次迭代前执行

```post_satement```: 每次迭代后执行

```process```: Loop的函数体


## Graph

Graph描述了整个流的依赖关系，执行顺序

```
{
	'cls': StartNode,
	'id': 1,
	'next': 2,
},
{
	'cls': SayHelloNode,
	'id': 2,
	'next': 3,
},
{
	'cls': StopNode,
	'id': 3,
 	'next': 4,
}
```

id 既可以再Graph结构体中配置,也可以在节点的定义本身中直接指定


Graph中节点的id不倾向于自己编写，arkfbp对应的语言实现会提供自动化配置的方案。

## 生命周期&Hook

### [节点生命周期钩子](./flowhooks.md)


### Flow生命周期钩子

1. before_create
2. created
3. before_initialize
4. initialized
5. before_execute
6. executed
7. before_destroy
8. destroyed

### 项目生命周期钩子

1. before_create
2. created
3. before_initialize
4. initialized
5. before_serve
6. served
7. before_stop
8. stopped

## 中间件

## 注入

通过state在对应生命周期内可以注入

## Todo项目的示例目录结构

以TodoApp的后端实现为例，需要描述：

1. 支持登录、注册、退出
2. 获取todo List，并支持筛选：status为未完成、已完成，支持分页查询
3. 获取单条todo的详情，记录不存在的时候能正常抛出404错误
4. 编辑单条Todo的详情，如标题，状态等
5. 删除单条Todo
6. 支持导出全部记录并下载为文件，支持status以及time的过滤条件

```
- nodes
    - db
        - user.py

- flows
    - login
        - __init__.py
	- nodes
	    - __init__.py
	        - node1.py
		- node2.py
		- node3.py
		- test_node1.py
		- test_node2.py
		- test_node3.py
- main.py
- router.py
```

## 工作流定义

工作流的定义可以由一张图来描述(Graph)

```
# auto-generated

import Node1 from './nodes/node1'
import Node2 from './nodes/node2'
import Node3 from './nodes/node3'

graph = {
    'nodes': [
        Node1,
	Node2,
	Node3,
    ],

    'edges': [
        (Node1, Node2),
        (Node2, Node3),
    ],
}
```

## StateStore(工作流状态)

工作流的执行环境是isolated，互不干扰，每条工作流实例共享一个全局状态, 当前工作流的所有节点可见。

### 修改状态

```
import ark

class Node:

    def run(self):
        def my_commit_state(state):
            state['count'] += 1
            return state

    self.commit_state(my_commit_state)
```

### 获取状态

```
import ark

class MyNode(ark.AbstactNode):

    def run(self):
        count = self.state['count']
	print(count)
```


## State
### HTTP 相关

```
request: Request{
    headers: {},
    method: 'GET',
    query_params: {},
    schema,
    body,
    path,
    path_info,
    encoding,
    content_type,
    cookies,
    files,
}
```


## 工作流执行

## 工具箱

任意语言的实现都应当提供以下相应的命令行工具：

1. arkfbp-create: 创建项目、创建工作流、创建节点的脚手架工具
2. arkfbp-run: 执行工作流
3. arkfbp-compile: 编译打包, 目标平台: 裸部署、Docker、k8s、ArkOS
4. arkfbp-lint
5. arkfbp-test

### arkfbp-create
创建基于Ark FBP的脚手架项目， 创建单条工作流脚手架等

### arkfbp-run
单次执行工作流

```arkfbp-run -p . -f ./flows/hello```

-h: 显示帮助信息
-v: 显示版本号
-p: 指定项目跟目录
-d: 以调试模式启动
-f: 指定执行工作流

### arkfbp-serve

以server的方式启动当前项目

-w : 自动监听本地文件，如果发现有变更的话，自动reload server。


### arkfbp-compile

编译、打包项目

```—target: bare, docker, arkos, kubernetes```


## 测试

### 节点单元测试

```
- node1.py
- test_node1.py
```

在对应的节点实现文件中，如果存在`test_xxx.py`的文件，则会被认为是该节点的单元测试文件，arkfbp执行框架将会自动发现其中的单元测试，并在需要执行的时候执行。


## 执行环境