<template>
  <div>
    <input @change="importEpub($event)" type="file">
  </div>
</template>

<script>
import parsedEpub from '../EpubParse.js'
// import parsedEpub from '../EpubParse.js'

export default {
    methods: {
        importEpub(event) {
            let blob = event.target.files[0]
           
        },
    },
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
// @import '..assets/styles/global';
</style>