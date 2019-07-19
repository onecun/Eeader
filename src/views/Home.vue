<template>
  <div class="home">
      <BookShelf></BookShelf>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import BookShelf from '@/components/BookShelf.vue'

export default {
  name: 'home',
  components: {
    BookShelf,
  }
}
</script>

<style lang='scss' rel='stylesheet/scss'>
.home {
    display: flex;
    justify-content: center;
}
</style>
