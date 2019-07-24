<template>
<div class="popup-setting-wrap">
    <h4>设置</h4>
    <div class="setting-list-group">
        <ul>
            <li class="theme-list">
                <i>阅读主题</i>
                <span class="theme-item" v-for="(theme, index) in themeList" :key="index" :title="theme.title" :style="theme.style" @click="switchTheme(theme.num)"></span>
            </li>
            <li class="font-family">
                <i>正文字体</i>
                <span @click="switchFontFamily(fontFamily)" class="font-family-item" v-for="(fontFamily, index) in fontFamilyList" :key="index">{{ fontFamily }}</span>
            </li>
            <li class="font-size">
                <i>字体大小</i>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            themeList: [
                {
                    title: '默认',
                    num: '1',
                    style: 'background: #f6f1e7 !important;'
                },
                {
                    title: '牛皮纸',
                    num: '2',
                    style: 'background: #f3e9c7 !important;'
                },
                {
                    title: '灰色',
                    num: '3',
                    style: 'background: #dcdcdc !important;'
                },
                {
                    title: '黑色',
                    num: '4',
                    style: 'background: #161819 !important; border: 1px solid #ccc;'
                },
            ],
            fontFamilyList: ['雅黑', '宋体', '楷体'],

        }
    },
    methods: {
        switchTheme(theme) {
            this.$emit('switch-theme', theme)
        },
        switchFontFamily(fontFamily) {
            console.log(fontFamily)
        },
    },
}
</script>

<style lang="scss">
.popup-setting-wrap {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border: 1px solid #fff;
    border-radius: 4px;

    h4 {
        padding: 20px;
        font-size: 20px;
    }
}

.setting-list-group {
    li {
        padding-top: 10px;
        text-align: left;
        margin: 0 50px;
    }
    i {
        font: 16px/24px PingFangSC-Regular,'-apple-system',Simsun;
        display: inline-block;
        min-width: 48px;
        margin-right: 16px;
        vertical-align: middle;
        color: #666;
    }
    span {
        display: inline-block;
        cursor: pointer;
        text-align: center;
        vertical-align: middle;
    }

    .theme-item {
        line-height: 32px;
        width: 34px;
        height: 34px;
        margin-right: 20px;
        border: 1px solid rgba(0,0,0,.1);
        border-radius: 100%;
    }

    .font-family-item {
        width: 78px;
        height: 34px;
        margin-right: 16px;
        transition: color .3s;
        border: 1px solid #ccc;
        border-radius: 2px;
        font: 14px/34px PingFangSC-Regular,HelveticaNeue-Light,'Helvetica Neue Light','Microsoft YaHei',sans-serif;
    }
}
</style>
