<template>
<div class="reader-wrap">
    <div v-html="content" class="reader-item-content"></div>
</div>
</template>

<script>
import { initDB, dbmethods } from '@/IndexedDB.js'

export default {
    data() {
        return {
            content: '',
            domparser: '',
        }
    },
    methods: {
        removeLink(string) {
            if (this.domparser === '') {
                this.domparser = new DOMParser()
            }
            let dom = this.domparser.parseFromString(string, 'text/html')
            let a = dom.querySelectorAll('a')
            for (let i = 0; i < a.length; i++) {
                const element = a[i]
                element.setAttribute('href', '#')
            }
            return `${dom.querySelector('body').innerHTML}`
        },
    },
    mounted() {
        this.currBook = this.$route.params.bookname
        initDB(this.currBook).then(() => {
            let toc = 0
            return dbmethods.read(this.currBook, toc)
        }).then((toc) => {
            toc.map(sec => {
                this.$store.commit('addsec', sec)
            })
            let cover = 3
            return dbmethods.read(this.currBook, cover)
        }).then((cover) => {
            this.content = this.removeLink(cover.content)
        })
    },
}
</script>

<style lang='scss' rel='stylesheet/scss'>
.reader-wrap {
    display: flex;
    width: 64%;
    min-height: 1000px;
    flex-wrap: wrap;
    border-radius: 4px;
    border: 1px solid black;

    .reader-item-content {

    }
}
</style>
