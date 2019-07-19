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
    db,
    initDB,
    dbmethods
} from '@/IndexedDB.js'
import {
    async
} from 'q';

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
                console.log('123')
                let content = dbmethods.read(this.$route.params.bookname, this.$route.query.url)
                content.then(c => {
                    this.bookContent = c
                })
            })

        }
    },

}
</script>
