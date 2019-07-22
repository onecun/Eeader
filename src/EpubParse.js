const domparser = new DOMParser()
const zip = new JSZip()
let unzip
let fullPath, OEBPSFolderName, contentOpfDom, spines
let realSecUrl = []
let toc = []

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
const containerXml = async (blob) => {
    unzip = await loadFile(blob)
    return await unzip.files["META-INF/container.xml"].async('string')
}

// 读取 contentOpt 文件
const contentOpt = async (blob) => {
    let temp_containerxml = await containerXml(blob)
    // 解析 container.xml 为 DOM
    let containerDom = domparser.parseFromString(temp_containerxml, 'text/xml')
    // 获取 content.opf 文件地址
    fullPath = containerDom.getElementsByTagName('rootfile')[0].getAttribute('full-path')
    // 如果没有 OEBPS 文件夹，设置为 ''
    OEBPSFolderName = fullPath.split('/')[0] === 'content.opf' ? '' : fullPath.split('/')[0]
    // 读取 contentOpt 文件
    return await unzip.files[fullPath].async('string')
}

const sectionUrlAndToc = async (blob) => {
    // 
    let temp_contentopf = await contentOpt(blob)
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

const allSection = async (blob) => {
    let temp_section_array = await sectionUrlAndToc(blob)
    let  sectionString = []
    let len = temp_section_array.length
    for (let i = 0; i < len; i++) {
        const url = temp_section_array[i]
        let real = realUrl(url)
        let item = await unzip.files[real].async('string')
        // 返回 section 和 他的地址
        console.log(real)
        realSecUrl.push(real)
        sectionString.push(item)
    }
    return sectionString
}

const parsedEpub = async (blob) => {
    reflash()
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

    let sectionsString = await allSection(blob)
    console.log(sectionsString)
    // save 为 需要存储的值
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
    // 获取 toc.ncx 地址
    let tocUrl = realUrl('toc.ncx')
    let temp_tocxml = await unzip.files[tocUrl].async('string')
    let tocDom = domparser.parseFromString(temp_tocxml, 'text/xml')
    toc = tocDom.querySelectorAll('navPoint')
    let nav = []
    for (let i = 0; i < toc.length; i++) {
        const secName = `${toc[i].querySelector('text').innerHTML}`
        const sectionUrl = realUrl(`${toc[i].querySelector('content').getAttribute('src')}`).split('#')[0]
        nav.push({
            'secName': secName,
            'sectionUrl': sectionUrl,
        })
    }

    return [save, nav]
}

const reflash = () => {
    unzip = undefined
    fullPath = undefined
    OEBPSFolderName = undefined
    contentOpfDom = undefined 
    spines = undefined
    realSecUrl = []
}

export default parsedEpub