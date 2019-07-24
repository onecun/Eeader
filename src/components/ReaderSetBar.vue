<template>
  <div class="reader-set" style="background: rgba(0,0,0,0) !important;}">
      <div @click="$emit('popup')" class="setting-wrap">设置</div>
      <div @click="goTop()" class="go-top">回到顶部</div>
  </div>
</template>

<script>
export default {
    methods: {
        goTop() {
            let height = document.querySelector('.reader-wrap').offsetHeight // 内容显示区高度
            let step = -(height / 100)
            const animation = function() {
                window.scrollBy(0, step)
                if (document.documentElement.scrollTop !== 0) {
                    requestAnimationFrame(animation)
                }
            }
            requestAnimationFrame(animation)
        },
    },

}
</script>

<style lang='scss' rel='stylesheet/scss'>
.reader-set {
    margin-left: 12px;
    padding-bottom: 40px; 
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 600px;
    overflow: hidden;
    position: sticky;
    top: 0;

    .setting-wrap, 
    .go-top {
        position: relative;
        padding: 0 20px;
        border-radius: 4px;
        background-color: #fff;
        font-weight: 500;
        height: 36px;
        line-height: 36px;
        color: #2c3e50;
        cursor: pointer;
    }
}
</style>