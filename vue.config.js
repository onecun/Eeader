module.exports = {
    configureWebpack: config => {
        config.externals = {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
        }
  },
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
}
