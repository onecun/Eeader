<template>
    <aside class="sidebar">

        <div @click="show(1)" class="book-shelf-small" :class="{'sidebar-item-active': isShow === 1}">
            <header class="sidebar-item-title sidebar-collapse-item">书架</header>
            <div v-show="isShow === 1" v-for="(bookdata, index) in bookList" :key="index" class="sidebar-item-book">
                <div class="sidebar-book-name sidebar-collapse-item-wrap">{{ bookdata.bookname }}</div>
            </div>
        </div>
        <div @click="show(2)" class="catalog" :class="{'sidebar-item-active': isShow === 2}">
            <header class="sidebar-item-title sidebar-collapse-item">目录</header>
            <div v-show="isShow === 2" v-for="(bookdata, index) in bookList" :key="index" class="sidebar-item-book">
                <div class="sidebar-book-name sidebar-collapse-item-wrap">{{ bookdata.bookname }}</div>
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
            } else if (select === 2 && this.isShow !== 2) {
                this.isShow = 2
            } else {
                this.isShow = 0
            }
        } 
    },

}
</script>

<style lang='scss' rel='stylesheet/scss'>
.sidebar {
    width: 17%;
    margin-right: 20px;
    text-align: left;

    .book-shelf-small, .catalog {
        font-size: 14px;
        font-weight: 500;
        line-height: 36px;
        position: relative;
        cursor: pointer;
        color: #3e3d43;
        margin: 20px 0;
        border: 1px solid transparent;
        border-radius: 4px;
        display: flex;
        flex-direction: column;

        .sidebar-item-title {
            padding: 0 20px;
        }
    }
    

    .sidebar-item-active {
        font-weight: 600;
        color: #ee4259;
        border: 1px solid #e0deda;
        background: #fff;
    }
    
}

.sidebar-collapse-item {
    display: flex;
    align-items: center;
    height: 48px;
    line-height: 48px;
    cursor: pointer;
    border-bottom: 1px solid #ebeef5;
    font-size: 16px;
    transition: border-bottom-color 0.3s;
    outline: none;
}

.sidebar-collapse-item-wrap {
    font-weight: 500;
    color: #3e3d43;
    padding: 0 20px;
}
</style>