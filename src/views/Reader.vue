<template>
<div class="reader" :class="curTheme">
    <SidebarReader></SidebarReader>
    <ReaderWrap></ReaderWrap>
    <ReaderSetBar @popup='showPopup = !showPopup'></ReaderSetBar>
    <div v-if="showPopup">
        <SettingPopup @switch-theme='switchTheme($event)'></SettingPopup>
    </div>
</div>
</template>

<script>
import SidebarReader from '@/components/SidebarReader.vue'
import ReaderWrap from '@/components/ReaderWrap.vue'
import ReaderSetBar from '@/components/ReaderSetBar.vue'

export default {
    data() {
        return {
            showPopup: false,
            selectTheme: 0,
        }
    },
    computed: {
        curTheme() {
            let themes = {
                1: {'theme-1': true},
                2: {'theme-2': true},
                3: {'theme-3': true},
                4: {'theme-4': true},

            }
            return themes[this.selectTheme]
        },
    },
    components: {
        SidebarReader, 
        ReaderWrap, 
        ReaderSetBar,
        SettingPopup: () => import('@/components/SettingPopup.vue'),
    },
    methods: {
        switchTheme(theme) {
            this.selectTheme = theme
        },
    },
}
</script>

<style lang="scss">
    .reader {
        display: flex;
        justify-content: center;
    }

    .theme-1 {
        background: #e9e3d6 !important;

        * {
            background: #f6f1e7 !important;
        }
    }
    .theme-2 {
        background: #decda1 !important;
        * {
            background: #f3e9c7 !important;
        }
    }
    .theme-3 {
        background: #d3d3d3 !important;
        * {
            background: #dcdcdc !important;
        }
    }
    .theme-4 {
        background: #101214 !important;
        * {
            background: #161819 !important;
            color: #666 !important;
        }
    }
</style>