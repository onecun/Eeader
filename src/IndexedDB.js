// 数据库结果
let db
const initDB = function (dbName, version = 1) {
    // 打开数据库
    var DBRequest = window.indexedDB.open(dbName, version)

    // 打开数据库失败
    DBRequest.onerror = function (event) {
        log('数据库打开失败')
    }

    // 数据库打开成功
    DBRequest.onsuccess = function (event) {
        // 存储数据结果
        db = DBRequest.result // or event.target.result
        // ... 其他事情
        console.log('打开成功')
    }

    // 数据库首次创建 或 版本升级(即 version 的数值 比以前的大)
    DBRequest.onupgradeneeded = function (event) {
        db = event.target.result
        // 创建一个数据库存储对象， 设置 'relativeurl' 是主键
        var objectStore = db.createObjectStore(dbName, {
            keyPath: 'relativeurl',
        })
        // 创建字段
        objectStore.createIndex('relativeurl', 'relativeurl', {
            unique: true
        })
        objectStore.createIndex('content', 'content')

        console.log('第一次打开成功')
    }
}

const dbmethods = {
    add(dbName, newItem) {
        let transaction = db.transaction([dbName], "readwrite")
        // 打开已经存储的数据对象
        let objectStore = transaction.objectStore(dbName)
        // 添加到数据对象
        let objectStoreRequest = objectStore.add(newItem)
        objectStoreRequest.onsuccess = function (event) {
            console.log('写入成功')
        }
        objectStoreRequest.onerror = function (event) {
            console.log('写入失败')
        }
    },
    read(dbName, key) {
        let transaction = db.transaction([dbName])
        let objectStore = transaction.objectStore(dbName)
        let objectStoreRequest = objectStore.get(key)
        objectStoreRequest.onsuccess = function (event) {
            // 对 request.result 做些操作！
            console.log('读取成功', event.target.result)
            document.querySelector('body').innerHTML = event.target.result.content
        }
        objectStoreRequest.onerror = function (event) {
            console.log('读取失败')
        }
    },
}