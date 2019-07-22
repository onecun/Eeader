<template>
  <div class="reader-set">
      <div class="setting-wrap">设置</div>
      <div class="go-top">
          <a href="javascript: scroll(0, 0)">返回顶部</a>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' rel='stylesheet/scss'>
.reader-set {
    width: 8%;
    margin-left: 12px;
    padding-bottom: 40px; 
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 600px;
    overflow: hidden;
    position: sticky;
    top: 0;

    .setting-wrap, 
    .go-top {
        border-radius: 4px;
        background-color: #fff;
        font-weight: 500;
        height: 36px;
        line-height: 36px;
        color: #2c3e50;
        padding: 0 20px;
        cursor: pointer;
    }
}
</style>