<template>
<div class="popup-setting-wrap">
    <h4 class="popup-setting-title">
        <span>设置</span>
        <span @click="hide()" class="popup-setting-cancel">+</span>
    </h4>
    <div class="setting-list-group">
        <ul>
            <li class="theme-list">
                <header>阅读主题</header>
                <span :class="{'popup-setting-selected': index == themeSelected}" class="theme-item" v-for="(theme, index) in themeList" :key="index" :title="theme.title" :style="theme.style" @click="switchTheme(theme.num, index)"></span>
            </li>
            <li class="font-family">
                <header>正文字体</header>
                <span :class="{'popup-setting-selected': index == fontFamilySelected}" @click="switchFontFamily(fontFamily, index)" class="font-family-item" v-for="(fontFamily, index) in fontFamilyList" :key="index">{{ fontFamily }}</span>
            </li>
            <li class="font-size">
                <header>字体大小</header>
                <span @click="decreaseSize()" class="font-size-item font-size-decrease">A-</span>
                <span class="font-size-item font-size-now">{{ curFontSize }}</span>
                <span @click="creaseSize()" class="font-size-item font-size-crease">A+</span>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    props: ['curFontSize'],
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
            themeSelected: 0,
            fontFamilySelected: 0,
        }
    },
    computed: {
        selected() {
            return 
        }
    },
    methods: {
        hide() {
            this.$emit('hide-popup')
        },
        switchTheme(theme, index) {
            this.$emit('switch-theme', theme)
            this.themeSelected = index
        },
        switchFontFamily(fontFamily, index) {
            this.$emit('switch-fontfamily', fontFamily)
            this.fontFamilySelected = index
        },
        decreaseSize() {
            this.$emit('set-font-size', this.curFontSize - 2)
        },
        creaseSize() {
            this.$emit('set-font-size', this.curFontSize + 2)
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
    padding-bottom: 26px;

    .popup-setting-title  {
        text-align: left;
        padding: 20px;
        font-size: 20px;

        .popup-setting-cancel {
            float: right;
            font-weight: 400;
            background: transparent;
            font-size: 32px;
            cursor: pointer;
            transform: rotate(45deg);
            transition: 0.5s;
            &:hover {
                transform: rotate(135deg);
                color: #ed4259;
            }
        }
    }
}

.setting-list-group {
    li {
        padding-top: 10px;
        text-align: left;
        margin: 0 50px;
    }
    header {
        font: 16px/24px PingFangSC-Regular,'-apple-system',Simsun;
        display: inline-block;
        min-width: 48px;
        margin-right: 16px;
        vertical-align: middle;
        // color: #666;
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

    .font-size-item {
        display: inline-block;
        width: 89px;
        height: 34px;
        vertical-align: middle;
        border: 1px solid #ccc;
        border-radius: 2px;
        font-size: 20px;
        line-height: 34px;
        &:hover {
            color: #ed4259;
        }
    }
    .font-size-now {
        border: 1px solid #ccc {
            left: 0px;
            right: 0px;
        }
    }
}

.popup-setting-selected {
    border: 1px solid #ed4259 !important;
    color: #ed4259;

}
</style>
