import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      booklist: [],
  },
  mutations: {
      addbook (state, book) {
          state.booklist.push(book)
      },
  },
  actions: {

  }
})
