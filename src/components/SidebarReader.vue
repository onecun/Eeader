<template>
    <aside class="sidebar">
        <div class="catalog">
            <header @click.self="show(1)" class="sidebar-item-title">目录</header>
            <div v-show="isShow === 1" v-for="(sec, index) in secList" :key="index" class="sidebar-item-book">
                <div @click="jumpTo(sec.sectionUrl)" class="sidebar-sec-name sidebar-collapse-item">{{ sec.secName }}</div>
            </div>
        </div>
    </aside>
</template>

<script>
export default {
    computed: {
        secList() {
            return this.$store.state.secList
        }
    },
    data() {
        return {
            isShow: 1,
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
        jumpTo(sectionUrl) {
            console.log(sectionUrl)
        },

    },

}
</script>

<style lang='scss' rel='stylesheet/scss'>
@import "../assets/sidebar.scss";

.sidebar-item-book:hover {
    background-color: rgba($color: #000000, $alpha: 0.04);
}

.sidebar {
    width: 13%;
    position: relative;
    height: 400px;
    overflow: hidden;
    position: sticky;
    top: 0;

    .catalog {
        position: absolute;
        left: 0;
        top: 0;
        right: -17px;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: scroll;
    }
}
</style>