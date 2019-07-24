<template>
  <div class="paging-wrap">
      <div @click="prePage()" class="pre-page">上一页</div>
      <div @click="nextPage()" class="next-page">下一页</div>
  </div>
</template>

<script>
import { initDB, dbmethods } from '@/IndexedDB.js'

export default {
    methods: {
        getBookData() {
            let bookname = this.$route.params.bookname
            let section = this.$route.query.section
            console.log(bookname, section)
            return [bookname, section]
        },
        prePage() {
            let bookData = this.getBookData()
            initDB(bookData[0]).then(() => {
                // section 减一 获取上一页
                return dbmethods.read(bookData[0], bookData[1] - 1)
            }).then((section) => {
               this.$emit('page-turing', section)
            })
            
        },
        nextPage() {
            let bookData = this.getBookData()
            initDB(bookData[0]).then(() => {
                // section 加一 获取下一页
                return dbmethods.read(bookData[0], bookData[1] + 1)
            }).then((section) => {
               this.$emit('page-turing', section)
            }).catch((err) => {
                console.log('err', err)
            })
        },
    },
}
</script>

<style lang='scss' rel='stylesheet/scss'>
.paging-wrap  {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-top: 1px solid #ccc;

    .pre-page, .next-page {
        width: 50%;
        padding: 20px;
        font-size: 18px;
        cursor: pointer;
    }
    .pre-page {
        border-right: 1px solid #ccc;
    }
}
</style>