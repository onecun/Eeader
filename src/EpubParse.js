const domparser = new DOMParser()
const zip = new JSZip()
let unzip
let fullPath, OEBPSFolderName, contentOpfDom, spines, tocUrl
let realSecUrl = []

// utils
const imgType = function(href) {
    let temp = href.split('.')
    return temp[temp.length - 1]
}
const realUrl = function(url) {
    if (OEBPSFolderName === '') {
        return url
    } else {
        return ( OEBPSFolderName + '/' + url)
    }
}

// 加载，解压文件
const loadFile = async (blob) => {
   return await zip.loadAsync(blob)
}

// 获取 container.xml
const containerXml = async () => {
    unzip = await loadFile(blob)
    return await unzip.files["META-INF/container.xml"].async('string')
}

// 读取 contentOpt 文件
const contentOpt = async () => {
    let temp_containerxml = await containerXml()
    // 解析 container.xml 为 DOM
    let containerDom = domparser.parseFromString(temp_containerxml, 'text/xml')
    // 获取 content.opf 文件地址
    fullPath = containerDom.getElementsByTagName('rootfile')[0].getAttribute('full-path')
    // 如果没有 OEBPS 文件夹，设置为 ''
    OEBPSFolderName = fullPath.split('/')[0] === 'content.opf' ? '' : fullPath.split('/')[0]
    // 读取 contentOpt 文件
    return await zip.file(fullPath).async('string')
}

const sectionUrlAndToc = async () => {
    // 获取 toc.ncx 地址
    tocUrl = realUrl('toc.ncx')
    // 
    let temp_contentopf = await contentOpt()
    contentOpfDom = domparser.parseFromString(temp_contentopf, 'text/xml')
    // 获取 图书显示顺序
    spines = contentOpfDom.getElementsByTagName('spine')[0].children
    let sectionUrl = []
    for(let i = 0; i < spines.length; i++) {
        let id = spines[i].getAttribute('idref')
        let href = contentOpfDom.getElementById(id).getAttribute('href')
        // 存入 sectionUrl
        sectionUrl.push(href)
    }
    return sectionUrl  
}

const allSection = async () => {
    let temp_section_array = await sectionUrlAndToc()
    let sectionString = temp_section_array.map(async (url) => {
        let real = realUrl(url)
        let item = await unzip.files[real].async('string')
        // 返回 section 和 他的地址
        console.log(real)
        realSecUrl.push(real)
        return item
    })
    return sectionString
}

const parsedEpub = async () => {
    // utils
    const imgUrl = async (section) => {
        let secDom = domparser.parseFromString(await section, 'text/html')    
        // 处理 svg 中的 image
        let images = secDom.getElementsByTagName('image')
        const secImgUrls = []
        for (let i = 0; i < images.length; i++) {
            const element = images[i]
            let href = element.getAttribute('xlink:href')
            let imageType = imgType(href)
            let real = realUrl(href).replace(/\/\.\.\//, '/')
            let data64 = await unzip.files[real].async("base64")
            // 设置属性
            element.setAttribute('xlink:href', 'data:image/' + imageType + ';base64,' + data64)
        }
        // 处理正常 img
        let imgs = secDom.getElementsByTagName('img')
        for (let i = 0; i < imgs.length; i++) {
            const element = imgs[i]
            let src = element.getAttribute('src')
            let imageType = imgType(src)
            let real = realUrl(src).replace(/\/\.\.\//, '/')
            let data64 = await unzip.files[real].async("base64")
            // 设置属性
            element.setAttribute('src', 'data:image/' + imageType + ';base64,' + data64)
        }
        return secDom
    }

    let sectionsString = await allSection()
    console.log(sectionsString)
    //
    let save = []
    let len = sectionsString.length
    for (let i = 0; i < len; i++) {
        const element = sectionsString[i]
        // const url = element
        let secDom = await imgUrl(element)
        save.push({
            'relativeurl': realSecUrl[i],
            'content': `${secDom.querySelector('body').innerHTML}`,
        })
    }
    return save
}

export default parsedEpub