<template>
<div class="reader">
    <SidebarReader></SidebarReader>
    <ReaderWrap></ReaderWrap>
    <ReaderSetBar></ReaderSetBar>
</div>
</template>

<script>
import SidebarReader from '@/components/SidebarReader.vue'
import ReaderWrap from '@/components/ReaderWrap.vue'
import ReaderSetBar from '@/components/ReaderSetBar.vue'

export default {
    components: {SidebarReader, ReaderWrap, ReaderSetBar},
}
</script>

<style lang="scss">
    .reader {
        display: flex;
        justify-content: center;
    }
</style>