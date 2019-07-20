<template>
  <div class="home">
      <Sidebar></Sidebar>
      <BookShelf></BookShelf>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import BookShelf from '@/components/BookShelf.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'home',
  components: {
    BookShelf,
    Sidebar,
  }
}
</script>

<style lang='scss' rel='stylesheet/scss'>
.home {
    display: flex;
    justify-content: center;
}
</style>
