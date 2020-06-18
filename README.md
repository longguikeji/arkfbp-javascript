- [1. ArkFBP-JavaScript](#1-arkfbp-javascript)
- [2. 简介 Introduction](#2-简介-introduction)
- [3. 快速上手 QuickStart](#3-快速上手-quickstart)
  - [3.1. 安装环境 SetUp](#31-安装环境-setup)
    - [3.1.1. 安装Arkfbp Tooling Install ArkFBP Tooling](#311-安装arkfbp-tooling-install-arkfbp-tooling)
    - [3.1.2. 安装VScode ArkFBP扩展 Install VSCode ArkFBP Extension](#312-安装vscode-arkfbp扩展-install-vscode-arkfbp-extension)
  - [3.2. 创建第一个项目 Create your first project](#32-创建第一个项目-create-your-first-project)
  - [3.3. 构建项目 Build the project](#33-构建项目-build-the-project)
  - [3.4. 运行项目 Launch the project](#34-运行项目-launch-the-project)
    - [3.4.3. 以WEBServer的方式启动 Run as the WEBServer](#343-以webserver的方式启动-run-as-the-webserver)
    - [3.4.4. 启动单条流 # Run individual flow](#344-启动单条流--run-individual-flow)
  - [3.5. 项目目录结构](#35-项目目录结构)
  - [3.6. flow的结构](#36-flow的结构)
  - [3.7. 流程图的定义](#37-流程图的定义)
    - [3.7.5. 流程图参数](#375-流程图参数)
  - [3.8. 「流」级别的全局变量](#38-流级别的全局变量)
- [4. 基础节点用法](#4-基础节点用法)
  - [4.9. 开始节点（StartNode）](#49-开始节点startnode)
    - [4.9.6. 流程图参数](#496-流程图参数)
    - [4.9.7. 节点参数](#497-节点参数)
    - [4.9.8. 重载函数](#498-重载函数)
  - [4.10. 结束节点（StopNode）](#410-结束节点stopnode)
    - [4.10.9. 流程图参数](#4109-流程图参数)
    - [4.10.10. 节点参数](#41010-节点参数)
    - [4.10.11. 重载函数](#41011-重载函数)
  - [4.11. 函数节点（FunctionNode）](#411-函数节点functionnode)
    - [4.11.12. 流程图参数](#41112-流程图参数)
    - [4.11.13. 节点参数](#41113-节点参数)
    - [4.11.14. 重载函数](#41114-重载函数)
  - [4.12. 条件节点（IFNode）](#412-条件节点ifnode)
    - [4.12.15. 流程图参数](#41215-流程图参数)
    - [4.12.16. 节点参数](#41216-节点参数)
    - [4.12.17. 重载函数](#41217-重载函数)
  - [4.13. Switch节点（SwitchNode）](#413-switch节点switchnode)
    - [4.13.18. 流程图参数](#41318-流程图参数)
    - [4.13.19. 节点参数](#41319-节点参数)
    - [4.13.20. 重载函数](#41320-重载函数)
  - [4.14. API节点（APINode）](#414-api节点apinode)
    - [4.14.21. 流程图参数](#41421-流程图参数)
    - [4.14.22. 节点参数](#41422-节点参数)
    - [4.14.23. 重载函数](#41423-重载函数)
  - [4.15. 循环节点（LoopNode）](#415-循环节点loopnode)
    - [4.15.24. 流程图参数](#41524-流程图参数)
    - [4.15.25. 节点参数](#41525-节点参数)
    - [4.15.26. 重载函数](#41526-重载函数)
  - [4.16. 流节点（FlowNode）](#416-流节点flownode)
    - [4.16.27. 流程图参数](#41627-流程图参数)
    - [4.16.28. 节点参数](#41628-节点参数)
    - [4.16.29. 重载函数](#41629-重载函数)
  - [4.17. 测试节点（TestNode）](#417-测试节点testnode)
    - [4.17.30. 流程图参数](#41730-流程图参数)
    - [4.17.31. 节点参数](#41731-节点参数)
    - [4.17.32. 重载函数](#41732-重载函数)
  - [4.18. 空节点（NopNode）](#418-空节点nopnode)
    - [4.18.33. 流程图参数](#41833-流程图参数)
    - [4.18.34. 节点参数](#41834-节点参数)
    - [4.18.35. 重载函数](#41835-重载函数)

# 1. ArkFBP-JavaScript

ArkFBP-JavaScript是一个ArkFBP的JS的实现。


# 2. 简介 Introduction

ArkFBP是一个基于Flow-Based Programming的一个开发框架，目前有JavaScript，Python，Golang等几个不同版本。


# 3. 快速上手 QuickStart

## 3.1. 安装环境 SetUp

### 3.1.1. 安装Arkfbp Tooling Install ArkFBP Tooling

1. 下载arkfbp预编译文件 Download precompiled arkfbp cli binary

    `wget https://github.com/arkfbp/arkfbp/releases/download/0.0.3-rc/arkfbp-darwin`

2. 给二进制文件赋予执行权限 Give the execution permission

    `chmod +x arkfbp`

3. 将文件移动到系统PATH目录下 Move the arkfbp cli to the OS Path

    `move arkfbp-darwin /usr/local/bin/arkfbp`


### 3.1.2. 安装VScode ArkFBP扩展 Install VSCode ArkFBP Extension

1. 下载扩展文件 Download VSCode Extension File

    [https://github.com/arkfbp/arkfbp/releases/download/0.0.3-rc/arkfbp-0.0.3.vsix](https://github.com/arkfbp/arkfbp/releases/download/0.0.3-rc/arkfbp-0.0.3.vsix)

1. 安装扩展文件 Install the arkfbp Extension

    [https://vscode-docs.readthedocs.io/en/stable/extensions/install-extension/](https://vscode-docs.readthedocs.io/en/stable/extensions/install-extension/)


## 3.2. 创建第一个项目 Create your first project

`arkfbp create --type server --language javascript --name helloworld`

## 3.3. 构建项目 Build the project

## 3.4. 运行项目 Launch the project

### 3.4.3. 以WEBServer的方式启动 Run as the WEBServer

### 3.4.4. 启动单条流 # Run individual flow


## 3.5. 项目目录结构
用arkfbp cli工具([https://github.com/longguikeji/arkfbp](https://github.com/longguikeji/arkfbp))创建一个js项目后，项目主体代码均在src目录中。

```javascript
src //源代码根目录，@
    databases //数据库的定义
    flows //流，所有流存放的目录
    models //ORM的数据库配置，由CLI工具自动生成
    routes //路由，定义所有开放的API接口
    testFlows //测试流，所有测试流存放的目录
```

所有flow都应该创建在flows目录中。

## 3.6. flow的结构

1. 每一个flow都由一个目录组成，目录名即为流的名字。
2. 在flow的根目录下的index.js文件中，定义了该流的『图』。
3. flow目录下有nodes目录，其中存放所有该流所包含的节点定义。
4. 每个节点都是一个js文件，用面向对象的方式继承自某个基础节点。

## 3.7. 流程图的定义
```javascript

import { Flow } from 'arkfbp/lib/flow'
import { Graph } from 'arkfbp/lib/graph'
import { StartNode } from 'arkfbp/lib/StartNode'
import { StopNode } from 'arkfbp/lib/StopNode'

import { AddVendorNode } from './nodes/addVendorNode'

export class Main extends Flow {

    createNodes() {
        return [
            {
                cls: StartNode,
                id: '1',
                next: '2',
            },
            {
                cls: AddVendorNode,
                id: '2',
                next: '3',
            },
            {
                cls: StopNode,
                id: '3',
            },
        ]
    }

    createGraph() {
        const g = new Graph()
        g.nodes = this.createNodes()
        return g
    }

}
```

在```createNodes```方法中，return的数据中包含了图的定义。个我们统一定义为 flow chart params，节点的**流程图参数**。

### 3.7.5. 流程图参数
| 参数名 | 类型   | 含义           | 示例                                                         |
| ------ | ------ | -------------- | ------------------------------------------------------------ |
| cls    | Class  | 节点类型       | cls: StartNode<br />cls: xxxxNode（xxxNode为某个Node的子类） |
| id     | String | 当前节点id     | id: '1'<br />id: 'start'                                     |
| next   | String | 下一个节点的id | next: 'stop'<br />next: '1'                                  |

一些特殊节点会有特殊的参数，如LoopNode的body。参见每个节点说明。

## 3.8. 「流」级别的全局变量

一个能在流内任意节点读写的变量，```this.$state```. 该变量不能直接使用，通过各种方法来进行读写。

| 函数     | 参数     | 功能                | 示例                                                                                                      |
| -------- | -------- | ------------------- | --------------------------------------------------------------------------------------------------------- |
| commit() | function | 修改state变量       | this.$state.commit(state => {<br />    state.a = 1;<br />    state.b = 2;<br />    return state;<br />} ) |
| fetch()  | 无       | 获取最新的state变量 | const a = this.$state.fetch().a                                                                           |



# 4. 基础节点用法

1. 节点的用法，需要先继承基础节点，然后确定该节点的参数与重载函数，最后在流程图中定义好该节点的流程图参数即可。
2. 所有节点都有一个共同的重载函数```run```，作为节点运行的主函数。
3. ```run```函数的返回值会成为该节点的```outputs```，即下一个节点的```inputs```。
4. 节点参数仅支持静态值，对节点内部如this.inputs或this.$state等值的访问都只能在函数中进行。

## 4.9. 开始节点（StartNode）

### 4.9.6. 流程图参数
[cls，id，next]

### 4.9.7. 节点参数
无

### 4.9.8. 重载函数
| 函数名 | 描述                                           | 是否必须重载 | 示例                                                                 |
| ------ | ---------------------------------------------- | ------------ | -------------------------------------------------------------------- |
| run()  | 作为节点运行主函数，默认功能是将inputs直接返回 | 否           | 一般不用，可在此函数中做一些对数据的预处理。<br />参考[FunctionNode] |

## 4.10. 结束节点（StopNode）
### 4.10.9. 流程图参数
[cls，id，next]

### 4.10.10. 节点参数
无

### 4.10.11. 重载函数
| 函数名 |                      描述                      | 是否必须重载 |                                    示例                                    |
| :----: | :--------------------------------------------: | :----------: | :------------------------------------------------------------------------: |
| run()  | 作为节点运行主函数，默认功能是将inputs直接返回 |      否      | 一般不用，可在此函数中完成对流的返回值的最后整理。<br />参考[FunctionNode] |

<br />

## 4.11. 函数节点（FunctionNode）

### 4.11.12. 流程图参数
[cls，id，next]

### 4.11.13. 节点参数
无

### 4.11.14. 重载函数
| 函数名 |        描述        | 是否必须重载 |
| :----: | :----------------: | :----------: |
| run()  | 作为节点运行主函数 |      是      |

示例：
```javascript
import { FunctionNode } from 'arkfbp/lib/functionNode'

export class CaseNode extends FunctionNode {
    async run() {
      	const data = this.inputs.a
        data.name = this.$state.fetch().name
      	this.$state.commit( state=>{
        	state.count ++;
          return state;
        })
        return data
    }
}
```

## 4.12. 条件节点（IFNode）

### 4.12.15. 流程图参数
[cls，id]

**注意：IFNode没有next**

| 参数名       | 类型   | 含义                                              | 示例                 |
| ------------ | ------ | ------------------------------------------------- | -------------------- |
| positiveNext | String | 当expression返回值为true时，会运行的下一个节点id  | positiveNext：'4'    |
| negativeNext | String | 当expression返回值为false时，会运行的下一个节点id | negativeNext: 'stop' |

### 4.12.16. 节点参数
无

### 4.12.17. 重载函数
|   函数名    |              描述               | 是否必须重载 |
| :---------: | :-----------------------------: | :----------: |
|    run()    |       作为节点运行主函数        |      是      |
| condition() | 条件，返回bool值， 默认返回true |      否      |
| positive()  |       条件满足的时候执行        |      否      |
| negative()  |      条件不满足的时候执行       |      否      |

示例：
```javascript
import { IFNode } from 'arkfbp/lib/ifNode'

export class MyIFNode extends IFNode {

  	condition(){
    	return this.inputs.a === 1
    }

    positive() {
        return {'error': 0}
    }

    negative() {
        return {'error': -1}
    }
}
```

## 4.13. Switch节点（SwitchNode）
实现多条件分支的逻辑，满足任一条件后，剩余的部分将不会被执行

### 4.13.18. 流程图参数
[cls，id](#emXYO)<br />注意：SwitchNode没有next

| 参数名 | 类型 | 含义                         | 示例                       |
| ------ | ---- | ---------------------------- | -------------------------- |
| route  | []   | 是个数组，每一项即为一个条件 | {                          |
|        |      |                              | ```cls: MySwitchNode,      |
|        |      |                              | id: "1",                   |
|        |      |                              | route: [                   |
|        |      |                              | {                          |
|        |      |                              | 'condition': 'condition1', |
|        |      |                              | 'positive': 'positive1',   |
|        |      |                              | 'negative': 'negative1',   |
|        |      |                              | 'next': '2',               |
|        |      |                              | },                         |
|        |      |                              | {                          |
|        |      |                              | 'condition': 'condition2', |
|        |      |                              | 'positive': 'positive2',   |
|        |      |                              | 'negative': 'negative2',   |
|        |      |                              | 'next': '3',               |
|        |      |                              | },                         |
|        |      |                              | {                          |
|        |      |                              | 'condition': 'condition3', |
|        |      |                              | 'positive': 'positive3',   |
|        |      |                              | 'negative': 'negative3',   |
|        |      |                              | 'next': '4',               |
|        |      |                              | },                         |
|        |      |                              | ]                          |
|        |      |                              | }```                       |

<a name="UNdcA"></a>
### 4.13.19. 节点参数
无
<a name="Txi51"></a>
### 4.13.20. 重载函数
无<br />示例：
```typescript
import { SwitchNode } from 'arkfbp/lib/switchNode'

export class MySwitchNode extends IFNode {

    condition1() {
        return this.inputs.a === 1
    }

    positive1() {
        // put any logic here
    }

    negative1() {
        // put any logic here
    }

    condition2() {
        return this.inputs.a === 2
    }

    positive2() {
        // put any logic here
    }

    negative2() {
        // put any logic here
    }

    condition3() {
        return this.inputs.a === 3
    }

    positive3() {
        // put any logic here
    }

    negative3() {
        // put any logic here
    }

}
```


## 4.14. API节点（APINode）

### 4.14.21. 流程图参数
[cls，id，next]

### 4.14.22. 节点参数
| 参数名  |      类型       | 是否必须 |                         描述                         |                                                                                                                             示例                                                                                                                             |
| :-----: | :-------------: | :------: | :--------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|  mode   |     string      |    是    |   请求方式，可选值：direct，proxy, 默认值为direct    |                                                                                     mode: proxy（通过ArkOS的APIserver发送请求）<br />mode: direct（直接向目标发送请求）                                                                                      |
|   url   |     string      |    是    |                       请求地址                       |                                                                                                                 url: 'https://www.x.com/api'                                                                                                                 |
| method  |     string      |    是    | 请求方式，可选值：<br />post,get等Http协议支持的选项 |                                                                                                                method：POST<br />method：GET                                                                                                                 |
|  auth   |      null       |    否    |          签名，保留字段，预计会用于用户验证          |                                                                                                                                                                                                                                                              |
| headers | any &#124; null |    是    |                  http请求的headers                   | headers = {<br />        'Accept': 'application/json;charset=utf-8',<br />        'X-Requested-With': 'XMLHttpRequest',<br />        'User-Agent': 'Mozilla/5.0',<br />        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',<br />    } |
| params  | any &#124; null |    否    |      http请求的参数，可由buildParams()函数代替       |                                                                                                                      params: 'a=1&b=2'                                                                                                                       |


### 4.14.23. 重载函数
|    函数名     |        描述        |              是否必须重载              |
| :-----------: | :----------------: | :------------------------------------: |
|     run()     | 作为节点运行主函数 |                   否                   |
| buildParams() |      构建参数      | 否，优先级比params高，注意不要重复使用 |

示例：
```javascript
import { APINode } from 'arkfbp/lib/apiNode'

export class PostAPINode extends APINode {
    mode = 'direct'
    url = 'https://sms.yunpian.com/v2/sms/tpl_batch_send.json'
    method = 'post'
    headers = {
        'Accept': 'application/json;charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    }

    buildParams() {
        console.log('PostApiNode:',this.inputs)
        return this.inputs
    }
}
```


## 4.15. 循环节点（LoopNode）

### 4.15.24. 流程图参数
[cls，id，next]

| 参数名 | 类型   | 含义   | 示例                                                       |
| ------ | ------ | ------ | ---------------------------------------------------------- |
| body   | Number | String | 循环体的下一个节点，从这个节点开始的后续节点都是在循环体内 | body：4 |


### 4.15.25. 节点参数
无

### 4.15.26. 重载函数
|        函数名        |                   描述                   | 是否必须重载 |
| :------------------: | :--------------------------------------: | :----------: |
|   initStatement()    |            初始化状态(i = 0)             |      是      |
| conditionStatement() |             条件判断（i<10）             |      是      |
|   postStatement()    |             末尾状态（i++）              |      是      |
|      process()       | 循环程序，返回值会被作为body循环体的输入 |      是      |

示例：
```javascript
import { LoopNode } from 'arkfbp/lib/loopNode'

export class LoopSendNode extends LoopNode {

    _i = 0

    initStatement() {
        this._i = 0
    }

    conditionStatement() {
        return this._i < this.inputs.mobiles.length
    }

    postStatement() {
        this._i++
    }

    process() {
        const data = 'mobile='+this.inputs.mobiles[this._i]
        return data
    }
}
```


## 4.16. 流节点（FlowNode）

### 4.16.27. 流程图参数
[cls，id，next]

### 4.16.28. 节点参数
| 参数名 | 类型  | 是否必须 |     描述     | 示例  |
| :----: | :---: | :------: | :----------: | :---: |
|  flow  | Flow  |    是    | 需要运行的流 |       |

<a name="B2QOV"></a>
### 4.16.29. 重载函数
|    函数名     |         描述         | 是否必须重载 |
| :-----------: | :------------------: | :----------: |
| buildInputs() | 构建运行flow时的输入 |      否      |

示例：
```javascript
import { TriggerFlowNode } from 'arkfbp/lib/triggerFlowNode'
import {Main as FooBarFlow} from '@/flows/foo/bar'

export class RunFooBarFlowNode extends TriggerFlowNode {

    flow = FooBarFlow

  	buildInputs(){
      	return {a: 1}
    }

}
```

## 4.17. 测试节点（TestNode）

### 4.17.30. 流程图参数
[cls，id，next]

### 4.17.31. 节点参数
| 参数名 |  类型  | 是否必须 |                             描述                             |    示例    |
| :----: | :----: | :------: | :----------------------------------------------------------: | :--------: |
|  flow  |  Flow  |    是    |                       需要测试的流的类                       |            |
| start  | String |    否    | 测试目标流的起始节点id<br />，为空则代表从流的第一个节点开始 | start: '5' |
|  stop  | String |    否    |      测试目标流的结束节点id<br />，为空则代表直到流结束      |  stop:'6'  |

### 4.17.32. 重载函数
|          函数名          |                            描述                            |   是否必须重载    |
| :----------------------: | :--------------------------------------------------------: | :---------------: |
|         setUp()          |         在所有case执行前执行，可以用来准备测试数据         |        否         |
|        tearDown()        | 在所有case执行完后执行，可以用来清理测试数据，比如删除操作 |        否         |
|     test{CaseName}()     |                       case，测试用例                       |    - testA(){}    |
|  test{CaseName}SetUp()   |            在对应case之前执行，用来准备测试数据            |  - testASetup()   |
| test{CaseName}TearDown() |            在对应case之后执行，用来清理测试数据            | - testATearDown() |

示例：

```javascript
import { TestNode } from 'arkfbp/lib/testNode'
import {Main as RegisterFlow} from '@/flows/main/register'
import {Config} from '@/models/config'
import assert from 'assert'

export class Node1 extends TestNode {

    flow = RegisterFlow

    setUp() {
    }

    tearDown() {
      	//在所有case执行完后执行
        console.info('tearDown')
    }

    testASetUp(){
        // 在testA之前执行
        //在所有case执行前执行
        this.inputs = {
            appid : 'demoapp',
            keys: [{
                key: 'testkey1',
                discription: 'testkey1 description11'
            },{
                key: 'testkey2',
                discription: 'testkey2 description22'
            }]
    		}
    }
   	testATearDown(){
        // 在testA之后执行
    }
    async testA() {
        const config = await Config.findOne({
            where: { appid: 'demoapp', key: 'testkey1' }
        })
        assert.strictEqual('testkey1',config.key)
    }

    async testB() {
        const config = await Config.findOne({
            where: { appid: 'demoapp', key: 'testkey2' }
        })
        assert.strictEqual('testkey2',config.key)
    }
}
```


## 4.18. 空节点（NopNode）
什么也不做

### 4.18.33. 流程图参数
[cls，id，next](#emXYO)

### 4.18.34. 节点参数
无

### 4.18.35. 重载函数
无
