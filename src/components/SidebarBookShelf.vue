<template>
    <aside class="sidebar">
        <div class="book-shelf-small">
            <header @click.self="show(1)" class="sidebar-item-title">书架</header>
            <div v-show="isShow === 1" v-for="(bookdata, index) in bookList" :key="index" class="sidebar-item-book">
                <div @click="jumpTo(bookdata.bookname)" class="sidebar-book-name sidebar-collapse-item">{{ bookdata.bookname }}</div>
            </div>
        </div>
    </aside>
</template>

<script>
export default {
    data() {
        return {
            isShow: 1,
        }
    },
    computed: {
        bookList() {
            return this.$store.state.booklist
        } 
    },
    methods: {
        show(select) {
            if (select === 1 && this.isShow !== 1) {
                this.isShow = 1
            } else {
                this.isShow = 0
            }
        },
        jumpTo(bookname) {
            this.$router.push({
                name: 'reader',
                params: {'bookname': bookname},
            })
        },

    },

}
</script>

<style lang='scss' rel='stylesheet/scss'>
@import "../assets/sidebar.scss";

.sidebar-item-book:hover {
    background-color: rgba($color: #000000, $alpha: 0.04);
}
</style>