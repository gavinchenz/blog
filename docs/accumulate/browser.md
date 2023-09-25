---
title: 浏览器
sidebar: auto
prev: /accumulate/javascript
next: false
---

## js关闭浏览器窗口的实现方式
> 功能描述: 
> 在网页上创建一个按钮，用户点击后弹窗提示是否关闭浏览器（窗口），如果用户点击“是”，关闭该页面，如果“否”，则什么也不做。

``` js
export const closeWindow = () => {
  var userAgent = navigator.userAgent
  if (userAgent.indexOf('Firefox') !== -1 || userAgent.indexOf('Chrome') !== -1) {
    window.location.replace('about:blank')
  } else {
    window.opener = null
    window.open('', '_self')
  }
  window.close()
}
```

### 代码说明
1. **location.replace()** 方法可用一个新文档取代当前文档。我们这里使用一个空 “about:blank”。
2. **opener** 属性是一个可读可写的属性，可返回对创建该窗口的 Window 对象的引用，这里我们赋值为空null；使用window.open() 打开一个窗口，赋值空字符串代表空白窗口。
3. **window.close()** 方法用于关闭浏览器窗口,所有主要浏览器基本都支持 **close()** 方法。
4. 如果是 **Firefox** 和 **Chrome** 执行 **location.replace()** 方法，其他浏览器执行`window.opener = null; window.open('', '_self');`

### 总结
在某些实际应用中，**window.close()** 和 **self.close()** 是不能关闭非弹出窗口的。
::: warning
非弹出窗口，即是指（opener=null 及 非window.open()打开的窗口,比如URL直接输入的浏览器窗体， 或由其它程序调用产生的浏览器窗口）。
:::
而且由于部分浏览器的限制，部分版本的保护加强，会导致上述代码被拦截。比如：对于火狐来说，默认js不能关闭用户打开的网页，但可以通过提醒用户改 firefox 的配置文件来实现:

步骤：
1. 在地址栏输入 `about:config` 然后回车，警告确认
2. 在过滤器中输入 `dom.allow_scripts_to_close_windows`，双击即可将此值设为 **true**
这种方法虽然可以很快解决问题，但是 **实际应用中不可能去要求每个用户去改自己浏览器的配置**。