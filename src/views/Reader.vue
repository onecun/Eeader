<template>
<div class="reader">
    <SidebarReader></SidebarReader>
    <ReaderWrap></ReaderWrap>
</div>
</template>

<script>
import SidebarReader from '@/components/SidebarReader.vue'
import ReaderWrap from '@/components/ReaderWrap.vue'

export default {
    components: {SidebarReader, ReaderWrap},
}
</script>

<style lang="scss">
    .reader {
        display: flex;
        justify-content: center;
    }
</style>