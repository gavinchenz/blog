module.exports = {
    port: 9080,
    title: 'Chen\'s blog',
    description: 'GavinChen的个人网站',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
      ['link', { rel: 'icon', href: '/assets/favicon/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    base: '/blog/', // 这是部署到github相关的配置
    markdown: {
      lineNumbers: false // 代码块显示行号
    },
    themeConfig: {
      search: false, // 禁用默认的搜索框，或是通过 true
      // searchMaxSuggestions: 10, // 调整默认搜索框显示的搜索结果数量，默认 10
      lastUpdated: '最后更新时间', // 最后更新时间
      activeHeaderLinks: false, // 嵌套的标题链接和 URL 中的 Hash 值会实时更新, 默认值：true 
      displayAllHeaders: false, // 默认值，为 true 显示所有页面的标题链接
      nextLinks: true, // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
      prevLinks: true, // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
      logo:'/assets/img/favicon-32x32.png',
      nav:[ // 导航栏配置
        {text: '前端', link: '/accumulate/'},
        // {
        //   text: '前端',
        //   ariaLabel: 'accumulate Menu',
        //   items: [
        //     { text: 'css', link: '/accumulate/css' },
        //     { text: 'javascript', link: '/accumulate/javascript' },
        //     { text: 'vue', link: '/accumulate/vue' },
        //   ]
        // },
        {text: 'GIS', link: '/gis/'},
        // {
        //   text: 'GIS',
        //   ariaLabel: 'GIS Menu',
        //   items: [
        //     { text: '二维', items: [
        //         { text: 'leaflet', link: '/gis/leaflet' },
        //         { text: 'iClient-leaflet', link: '/gis/iClient-leaflet' },
        //       ] 
        //     },
        //     { text: '三维', items: [
        //         { text: 'Cesium', link: '/gis/cesium' },
        //         { text: 'iClient-leaflet', link: '/gis/iClient-Cesium' },
        //       ] 
        //     }
        //   ]
        // },
        {text: '帮助文档', link: '/skill/'},
        // {text: '微博', link: 'https://baidu.com'},
      ],
      // sidebar: 'auto', // 侧边栏配置
      // sidebarDepth: 2, // 侧边栏显示2级
      sidebar: {
        '/accumulate/':['', 'css','javascript', 'vue'],
        '/gis/':['', 'leaflet', 'iClient-leaflet','cesium', 'iClient-leaflet'],
        'skill': [''],
        '/':['', 'about']
      }
    },
    configureWebpack: {
      resolve: {
        alias: {
          '@assets': './public/assets',
          '@img': './public/assets/img',
        }
      }
    }
  };