<template>
<div class="reader-wrap">
    <div v-html="content" class="reader-item-content"></div>
    <paging @page-turing='pageTurning($event)'></paging>
</div>
</template>

<script>
import { initDB, dbmethods } from '@/IndexedDB.js'
import paging from './Paging.vue'

export default {
    components: {paging},
    data() {
        return {
            currBook: '',
            content: '',
            domparser: '',
        }
    },
    computed: {
        currUrl() {
            return this.$store.state.readerCurrContentUrl
        },

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
        changeAddress(secNumber) {
            let bookname = this.$route.params.bookname
            this.$router.replace({ 
                name: 'reader', 
                params: {'bookname': bookname},
                query: {'section': secNumber},
            })
        },
        pageTurning(section) {
            this.content = this.removeLink(section.content)
            this.changeAddress(section.section)
        },
    },
    watch: {
        'currUrl': function(url) {
            initDB(this.currBook).then(() => {
                return dbmethods.indexRead(this.currBook, url)
            }).then((section) => {
                console.log(section)
                this.content = this.removeLink(section.content)
                this.changeAddress(section.section)
            })
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
            let cover = 1
            return dbmethods.read(this.currBook, cover)
        }).then((section) => {
            this.content = this.removeLink(section.content)
        })
        //
        this.changeAddress(1)
    },
}
</script>

<style lang='scss' rel='stylesheet/scss'>
.reader-wrap {
    display: flex;
    width: 56%;
    flex-wrap: wrap;
    border-radius: 4px;
    background-color: #f7f2e8; 
    border: 1px solid #d8d8d8;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .35);
    margin-bottom: 30px;
}

.reader-item-content {
    width: 100%;
    // 自定义
    font-family: 'Microsoft YaHei',PingFangSC-Regular,HelveticaNeue-Light,'Helvetica Neue Light',sans-serif;
    text-align: left;
    font-size: 18px;
    min-height: 400px;
    padding: 60px 64px;
    padding-bottom: 30px; 

    h1, h2, h3 {
        font: 24px/32px PingFangSC-Regular,HelveticaNeue-Light,'Helvetica Neue Light','Microsoft YaHei',sans-serif;
        // overflow: hidden;
        height: 32px;
        margin-bottom: 12px;
        font-weight: 600;
    }
    img, svg {
        width: 50%;
        display: block;
        margin: 0 auto;
    }
    div, p, a {
        line-height: 1.8;
        overflow: hidden;
        margin: .8em 0;
    }
}
</style>
