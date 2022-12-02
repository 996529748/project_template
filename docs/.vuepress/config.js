module.exports = {
  base: '/项目目录名称/docs/.vuepress/dist/',
  title: 'title',
  description: 'description',
  themeConfig:{
    lastUpdated: '上次更新:',
    sidebar: {
      '/page/':[
          {
            title: '示例',
            collapsable: false,
            path:"demo.md"
          },
      ]
    }
  },
  plugins: ['fulltext-search']
}
