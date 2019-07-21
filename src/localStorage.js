export default {
    /**
     * 存储格式
     * bookname: [ 
     *  {
     *      name: '三体'，
     *  },
     *  {
     *      name: '球形闪电',
     *  }
     *      ]
     */
    clearLocal() {
        localStorage.clear()
    },
    getLocal() {
        let str = localStorage.getItem('books')
        if (str) {
            return JSON.parse(str)
        } else {
            return []
        }
    },
    saveLocal(json) {
        this.clearLocal()
        localStorage.setItem('books', JSON.stringify(json))
    },
}