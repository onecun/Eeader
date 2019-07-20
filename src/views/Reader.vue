<template>
<div>
    <div class="loading" v-if="loading">加载中</div>
    <div>{{$route.params.bookname}}</div>
    <div>{{ $route.query.url }}</div>
    <button @click="getContent()">冲</button>
    <div v-html="bookContent"></div>

</div>
</template>

<script>
import {
    initDB,
    dbmethods
} from '@/IndexedDB.js'

export default {
    data() {
        return {
            loading: true,
            bookContent: '',
        }
    },
    methods: {
        getContent() {
            let openingDb = initDB(this.$route.params.bookname)
            openingDb.then(() => {
                let id = 0
                let content = dbmethods.read(this.$route.params.bookname, id)
                content.then(content => {
                    this.bookContent = content
                })
            })

        }
    },

}
</script>
