# Flow Hooks

Flow的Hooks是为了方便开发者更好的实现自己的需求


## Flow状态流转图


```
before_create -> creating -> created

    -> before_execute -> executing -> executed

         -> before_destroy -> destroying -> destroyed
```


## Hook类型

当前支持以下几种Hooks

1. ```created``` 流被创建后触发
2. ```before_initialize``` 流在初始化之前
3. ```initialized``` 流已经初始化完成，下一次即将执行
4. ```before_execute``` 执行前的最后一个hook点
5. ```executed``` 流已经执行完毕
6. ```before_destroy``` 流实例即将被释放的时候触发

## 注意

需要特别注意的是，当前没有```before_create```以及```destroyed```两种hook，因为前者flow实例尚未被创建，后者flow实例已经被销毁，无法执行flow级别定义的回掉。

这两种状态的监测可以在其它级别的hook中实现。




