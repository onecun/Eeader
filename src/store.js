import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      booklist: [],
      secList: [],
  },
  mutations: {
      addbook (state, book) {
          state.booklist.push(book)
      },
      addsec (state, sec) {
          state.secList.push(sec)
      },
  },
  actions: {

  }
})
