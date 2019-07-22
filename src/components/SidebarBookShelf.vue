<template>
    <aside class="sidebar">
        <header @click.self="show(1)" class="sidebar-item-title">书架</header>
        <div v-show="isShow === 1" class="book-shelf-small">
            <div v-for="(bookdata, index) in bookList" :key="index" class="sidebar-item-book">
                <div @click="jumpTo(bookdata.bookname)" class="sidebar-book-name sidebar-collapse-item">{{ bookdata.bookname }}</div>
            </div>
        </div>
    </aside>
</template>

<script>
import {bookShelf} from '@/mixins/bookShelf.js'
import {sidebar} from '@/mixins/sidebar.js'

export default {
    mixins: [bookShelf, sidebar],
    
    computed: {
        bookList() {
            return this.$store.state.booklist
        } 
    },
    

}
</script>

<style lang='scss' rel='stylesheet/scss'>
@import "../assets/sidebar.scss";

.sidebar-item-book:hover {
    background-color: rgba($color: #000000, $alpha: 0.04);
}
</style>