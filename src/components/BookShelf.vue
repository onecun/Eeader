<template>
<div class="book-shelf-wrapper">
    <div v-for="(bookdata, index) in bookList" :key="index" class="book-item" @click="jumpTo(bookdata.bookname)">
        <div v-html="bookdata.cover" class="book-cover"></div>
        <div class="book-name">{{ bookdata.bookname }}</div>
    </div>
    <div @click="addBook()" class="add-book">
        <div class="add-book-img">
            <div class="add-book-img-svg">
                <svg t="1563699280848" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9282" data-spm-anchor-id="a313x.7781069.0.i4" width="200" height="200">
                    <path d="M903 558.2c-13.3 0-24 10.7-24 24v216.7c0 16.8-16.1 30.4-36 30.4H181c-19.9 0-36-13.6-36-30.4V561.3c0-13.3-10.7-24-24-24s-24 10.7-24 24v237.6c0 43.2 37.7 78.4 84 78.4h662c46.3 0 84-35.2 84-78.4V582.2c0-13.3-10.7-24-24-24z" fill="#AAAAAA" p-id="9283"></path>
                    <path d="M334.5 298.6l160.9-145.3c1.1-1 2.3-1.9 3.6-2.7h0.1c0.6-0.4 1.2-0.7 1.9-1 0 0 0.1 0 0.1-0.1 0.6-0.3 1.3-0.6 1.9-0.8 0 0 0.1 0 0.1-0.1 0.6-0.2 1.3-0.4 1.9-0.6h0.2c0.6-0.2 1.3-0.3 1.9-0.4h0.2c0.6-0.1 1.3-0.2 2-0.3h0.2c0.7-0.1 1.3-0.1 2-0.1h0.2c0.6 0 1.3 0 1.9 0.1h0.3c0.7 0.1 1.3 0.2 2 0.3h0.2c0.7 0.1 1.3 0.3 2 0.5h0.1c0.7 0.2 1.3 0.4 2 0.7h0.1c0.7 0.3 1.3 0.5 2 0.9 1.3 0.7 2.6 1.4 3.8 2.3 0.6 0.5 1.2 0.9 1.7 1.4l158.6 145.3c9.8 9 10.4 24.1 1.5 33.9-9 9.8-24.1 10.4-33.9 1.5L535.1 225.3l-3 467.2c-0.1 13.2-10.8 23.8-24 23.8h-0.2c-13.3-0.1-23.9-10.9-23.8-24.2l3-466.7-120.4 108.8c-9.8 8.9-25 8.1-33.9-1.7-8.9-9.8-8.1-25 1.7-33.9z" fill="#AAAAAA" p-id="9284"></path>
                </svg>
            </div>
        </div>
        <div class="add-book-text">添加图书</div>
        <input ref="input" @change="loadFile($event)" type="file" class="input">
    </div>
</div>
</template>

<script>
import parsedEpub from '@/EpubParse.js'
import {
    initDB,
    dbmethods
} from '@/IndexedDB.js'
import localStorage from '@/localStorage.js'
import {bookShelf} from '@/mixins/bookShelf.js'

export default {
    mixins: [bookShelf],
    data() {
        return {
            // 存储每本书的第一页地址
            currBlob: '',
            currDbName: '',
            booksName: [],
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
            // 维持一个包含 所有书名 的数组
            this.booksName.push(this.currDbName)
                // 解析 epub 文件， 然后将章节存入数据库
                openingDB.then((state) => {
                    if (state === 'first-open') {
                        // 第一次存储
                        parsedEpub(this.currBlob)
                            .then((data) => {
                                // 存入目录
                                let nav = data[1]
                                dbmethods.add(this.currDbName, nav, 0)
                                // 存入数据 data[0] 就是需要存储的文章内容
                                let secs = data[0]
                                let len = secs.length
                                for (let i = 0; i < len; i++) {
                                    let sec = secs[i]
                                    dbmethods.add(this.currDbName, sec, i + 1)
                                }
                            })
                            .then(() => {
                                // 获取封面
                                this.getCover()
                                this.localSave()
                            })
                    } else if (state === 'open') {
                        // 不解析文件，indexedDb 中已存在
                        this.getCover()
                        this.localSave()
                    }
                })
        },
        getCover(bookName) {
            let currbook
            if (bookName === undefined) {
                currbook = [this.currDbName]
            } else {
                currbook = bookName
            }
            let sec = 1 // 封面
            dbmethods.read(currbook, sec)
                .then((cover) => {
                    let bookdata = {}
                    bookdata.bookname = currbook
                    bookdata.cover = cover.content
                    this.$store.commit('addbook', bookdata)
                })
        },

        localSave() {
            localStorage.saveLocal(this.booksName)
        },
    },
    mounted() {
        console.log('123')
        let books = localStorage.getLocal()
        this.booksName = books
        if (books.length >= 1) {
            books.map(bookName => {
                initDB(bookName).then(() => {
                    this.getCover(bookName)
                })
            })
        }
    },
}
</script>

<style lang="scss">
.book-shelf-wrapper {
    display: flex;
    width: 50%;
    min-height: 370px;
    flex-wrap: wrap;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, .35), 0 0 5px #f9f2e9 inset;

    .book-item {
        max-height: 180px;
        max-width: 104px;
        display: inline-block;
        margin: 20px;
        overflow: hidden;
        cursor: pointer;

        .book-cover {
            height: 142px;
            max-height: 142px;
            vertical-align: top;
            box-shadow: 0 1px 6px rgba(0, 0, 0, .35), 0 0 5px #f9f2e9 inset;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            img {
                max-width: 100%;
                max-height: 100%;
            }

            h1,
            h2,
            h3,
            p,
            span,
            ul,
            li {
                font-size: 14px;
                padding: 0;
                margin: 0;
                list-style: none
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
        max-width: 106px;
        max-height: 169px;
        display: inline-block;
        margin: 20px;
        overflow: hidden;
        box-sizing: border-box;
        cursor: pointer;
        position: relative;

        .add-book-img {
            height: 142px;
            max-height: 142px;
            vertical-align: top;
            box-shadow: 0 1px 6px rgba(0, 0, 0, .35), 0 0 5px #f9f2e9 inset;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            .add-book-img-svg {
                position: relative;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);

                svg {
                    width: 40%;
                    height: 40%;
                }
            }
        }

        .add-book-text {
            font-weight: 600;
            overflow: hidden;
            max-width: 106px;
            margin: 7px 0 0 0;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}

.input {
    visibility: hidden;
}
</style>
