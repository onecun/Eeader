export const bookShelf = {
    methods: {
        jumpTo(bookname) {
            this.$router.push({
                name: 'reader',
                params: {'bookname': bookname},
                query: {'section': 0},
            })
        },
    }
}