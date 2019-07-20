<template>
<div class="book-shelf-wrapper">
    <div v-for="(bookdata, index) in bookList" :key="index" class="book-item" @click="toReader(bookdata)">
        <div v-html="bookdata.cover" class="book-cover"></div>
        <div class="book-name">{{ bookdata.bookname }}</div>
    </div>
    <div @click.self="addBook()" class="add-book">
        <div>添加图书</div>
        <input ref="input" @change="loadFile($event)" type="file" class="input">
    </div>
</div>
</template>

<script>
import parsedEpub from '@/EpubParse.js'
import {initDB, dbmethods} from '@/IndexedDB.js'

export default {
    data() {
        return {
            // 存储每本书的第一页地址
            currBlob: '',
            currDbName: '',
        }
    },
    computed: {
        bookList() {
            return this.$store.state.booklist
        } 
    },
    methods: {
        addBook() {
            this.$refs.input.click()
        },
        loadFile(event) {
            // 选取同一文件不做处理
            if (event.target.files.length < 1) {
                return
            }
            // 得到文件
            this.currBlob = event.target.files[0]
            this.currDbName = this.currBlob.name.split('.')[0]
            // 建立/打开 对应 indexedDB 数据库, opening 是 promise 对象
            let openingDB = initDB(this.currDbName)
            // 获取每本书的元信息
            let bookdata = {}
            bookdata.bookname = this.currDbName,
            // 解析 epub 文件， 然后将章节存入数据库
            openingDB.then((state) => {
                console.log(state, 'state')
                if (state === 'first-open') {
                    // 第一次存储
                    parsedEpub(this.currBlob)
                    .then((data) => {
                        // 存入数据
                        data.map((sec, index) => {
                            console.log(index)
                            dbmethods.add(this.currDbName, sec, index)
                        })
                    })
                    .then(() => {
                        // 获取封面
                        let id = 0
                        dbmethods.read(this.currDbName, id)
                        .then((cover) => {
                            bookdata.cover = cover
                            this.$store.commit('addbook', bookdata)
                        })
                    })
                } else if (state === 'open') {
                    // 不解析文件，indexedDb 中已存在
                    let id = 0
                    dbmethods.read(this.currDbName, id)
                        .then((cover) => {
                            bookdata.cover = cover
                            this.$store.commit('addbook', bookdata)
                    })
                }
            })
        },
        toReader(bookdata) {
            this.$router.push({
                name: 'reader',
                params: {bookname: bookdata.bookname},
            })
        },
    },

}
</script>

<style lang='scss' rel='stylesheet/scss'>
.book-shelf-wrapper {
    display: flex;
    width: 584px;
    min-height: 370px;
    flex-wrap: wrap;
    border-radius: 4px;
    background-color: #fff; 
    box-shadow: 1px 1px 4px rgba(0,0,0,.35), 0 0 5px #f9f2e9 inset;
    
    .book-item {
        height: 169px;
        display: inline-block;
        margin: 20px;
        overflow: hidden;
        cursor: pointer;

        .book-cover {
            max-width: 106px;
            height: 142px;
            max-height: 142px;
            vertical-align: top;
            box-shadow: 0 1px 6px rgba(0,0,0,.35), 0 0 5px #f9f2e9 inset;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            img {
                width: 100%;
                height: 100%;
            }
        }

        .book-name {
            font-weight: 600;
            overflow: hidden;
            max-width: 106px;
            margin: 7px 0 0 0;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

    .add-book {
        width: 106px;
        height: 142px;
        display: inline-block;
        margin: 20px;
        overflow: hidden;
        border: 1px solid black;
        box-sizing: border-box;
        cursor: pointer;
        position: relative;

        div {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}

.input {
    visibility: hidden;
}
</style>
