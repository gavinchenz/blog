### 所有页面的新建位置均在 /docs 文件夹下，与 .vuepress 文件夹平级

### 2种路由模式
::: tip 
#### 模式1：
##### /docs 目录下 新建 .md 文件
##### eg: /docs/about.md
##### 路由地址为: localhost:8080/about.html
#### 模式2：
##### /docs 目录下 新建 XXX 文件夹，并在 XXX 文件夹下新建 README.md 文件
##### eg: /docs/accumulate/README.md
##### 路由地址为: localhost:8080/accumulate/
:::

### 禁用某个指定页面的导航栏：
``` yaml
---
navbar: false
---
```

### 禁用某个指定页面的侧边栏：
``` yaml
--
sidebar: false
---
```

### config.js 中设置的侧边栏是全局通用的，如果想给单个页面自动生成侧栏
``` yaml
---
sidebar: auto
---
```

### config.js 中设置的上 / 下一篇链接是全局通用的，如果想给单个页面设置
链接文字为被链接文档中第一个标题 如下面案例中 /skill/README.md 中 # 技术文档地址
``` yaml
---
prev: /skill/
next: false
---
```