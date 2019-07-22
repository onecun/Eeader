export const sidebar = {
    data() {
        return {
            isShow: 1,
        }
    },
    methods: {
        show(select) {
            if (select === 1 && this.isShow !== 1) {
                this.isShow = 1
            } else {
                this.isShow = 0
            }
        },
    },
}