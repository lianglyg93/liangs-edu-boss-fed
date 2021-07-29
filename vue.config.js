module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/styles/variables.scss";`,
      },
    },
  },
  devServer: {
    proxy: {
      "/front": {
        target: "http://edufront.lagou.com",
        changeOrigin: true,
      },
      "/boss": {
        target: "http://eduboss.lagou.com",
        changeOrigin: true,
      },
    },
  },
};
