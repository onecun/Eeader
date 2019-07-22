<template>
    <aside class="sidebar">
        <header @click.self="show(1)" class="sidebar-item-title">目录</header>
        <div v-show="isShow === 1" class="catalog">
            <div v-for="(sec, index) in secList" :key="index" class="sidebar-item-book">
                <div @click="jumpTo(sec.sectionUrl)" class="sidebar-sec-name sidebar-collapse-item">{{ sec.secName }}</div>
            </div>
        </div>
    </aside>
</template>

<script>
import {sidebar} from '@/mixins/sidebar.js'

export default {
    mixins: [sidebar],
    data() {
        return {
            currSection: 0,
        }
    },
    computed: {
        secList() {
            return this.$store.state.secList
        }
    },
    methods: {
        jumpTo(sectionUrl) {
            this.$store.commit('changeurl', sectionUrl)
        },

    },

}
</script>

<style lang='scss' rel='stylesheet/scss'>
@import "../assets/sidebar.scss";

.sidebar {
    width: 13%;
    height: 400px;
    overflow: hidden;
    position: sticky;
    top: 0;

    .catalog {
        position: absolute;
        left: 0;
        top: 48px;
        right: -17px;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: auto;
    }
}
</style>