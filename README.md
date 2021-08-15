# liangs-edu-boss-fed

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

1.说说 application/json 和 application/x-www-form-urlencoded二者之间的区别。
如果请求数据是普通对象，则content-type是application/json，告诉服务器请求的主题内容是json格式的字符串，服务器端会对json字符串进行解析，
这种方式的好处就是前端人员不需要关心数据结构的复杂度
如果请求数据是qs.stringify(data)对数据进行序列化处理，会将转换之后的数据以键值对形式式发送到服务器（key1=value&key2=value)则content-type会被设置为application/x-www-form-urlencoded。
2.说一说在前端这块，角色管理你是如何设计的。 3.@vue/cli 跟
vue-cli 相比，@vue/cli 的优势在哪？ 4.详细讲一讲生产环境下前端项目的自动化部署的流程。　 5.你在开发过程中，遇到过哪些问题，又是怎样解决的？请讲出两点。 6.针对新技术，你是如何过渡到项目中？
