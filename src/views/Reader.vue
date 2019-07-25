<template>
<div class="reader" :class="curTheme">
    <SidebarReader></SidebarReader>
    <ReaderWrap :class="curFontFamily"></ReaderWrap>
    <ReaderSetBar @popup='showPopup = !showPopup'></ReaderSetBar>
    <div v-if="showPopup">
        <SettingPopup @hide-popup='showPopup = false' :curFontSize='curFontSize' @switch-theme='switchTheme($event)' @switch-fontfamily='switchFontFamily($event)' @set-font-size='setFontSize($event)'></SettingPopup>
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
            selectFontFamily: '',
            curFontSize: 18,
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
        curFontFamily() {
            let fontFamily = {
                '雅黑': {'yahei': true},
                '宋体': {'song': true},
                '楷体': {'kai': true},
            }
            return fontFamily[this.selectFontFamily]
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
        switchFontFamily(fontFamily) {
            this.selectFontFamily = fontFamily
        },
        setFontSize(size) {
            if (size > 48 || size < 12) {
                return
            }
            this.curFontSize = size
            document.querySelector('.reader-item-content').style.fontSize = `${size}px`
        },
    },
}
</script>

<style lang="scss">
    .reader {
        display: flex;
        justify-content: center;
    }

    @import '../assets/readerContent.scss';
</style>