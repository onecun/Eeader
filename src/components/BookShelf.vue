<template>
<div class="book-shelf-wrapper">
    <div v-for="(bookdata, index) in bookList" :key="index" class="book" @click="toTest(bookdata)">{{ bookdata }}</div>
    <div @click.self="addBook()" class="add-book">
        <span>添加图书</span>
        <input ref="input" @change="loadFile($event)" type="file" class="input">
    </div>
</div>
</template>

<script>
import parsedEpub from '@/EpubParse.js'
import {db, initDB, dbmethods} from '@/IndexedDB.js'

export default {
    data() {
        return {
            // 存储每本书的第一页地址
            bookList: [],
            currBlob: '',
            currDbName: '',
        }
    },
    methods: {
        addBook() {
            this.$refs.input.click()
        },
        loadFile(event) {
            // 上传文件
            console.log(event)
            this.currBlob = event.target.files[0]
            this.currDbName = this.currBlob.name.split('.')[0]
            // 建立/打开 对应 indexedDB 数据库, opening 是 promise 对象
            let openingDB = initDB(this.currDbName)
            //
            let bookdata = {}
            bookdata.bookname = this.currDbName,
            // 解析 epub 文件， 然后将章节存入数据库
            openingDB.then(() => {
                parsedEpub(this.currBlob).then(data => {
                    bookdata.first = data[3].relativeurl
                    this.bookList.push(bookdata)
                    data.map(sec => {
                        dbmethods.add(this.currDbName, sec)
                    })
                })
            })
        },
        toTest(bookdata) {
            this.$router.push({
                name: 'test',
                params: {bookname: bookdata.bookname},
                query: {url: bookdata.first}
            })
        },
    },

}
</script>

<style lang='scss' rel='stylesheet/scss'>
.book-shelf-wrapper {
    border: 1px solid black;
    display: flex;
    width: 584px;
    min-height: 370px;
    flex-wrap: wrap;
    
    .book {
        width: 140px;
        height: 180px;
        border: 1px solid red;
        margin: 2px;
    }

    .add-book {
        width: 140px;
        height: 180px;
        border: 1px solid red;
        margin: 2px;
    }
}

.input {
    visibility: hidden;
}
</style>
