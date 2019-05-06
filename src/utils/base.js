
// 将后台的 json 转成 jsonTree 格式
export const jsonTree = (data, config) => {
    
    const id = config.id || 'id'
    const pid = config.pid || 'pid'
    const children = config.children || 'children'
    const idMap = []
    const jsonTree = []

    data.forEach(v => { idMap[v[id]] = v })

    data.forEach(v => {
        const parent = idMap[v[pid]]
        delete v.parent
        if(parent) {
            !parent[children] && (parent[children] = [])
            parent[children].push(v)
        } else jsonTree.push(v)
    })
    
    return jsonTree
}

// 格式化日期
Date.prototype.Format = function (fmt) {
   
    var o = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        'S': this.getMilliseconds()
    }

    if(/(y+)/.test(fmt)) 
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
   
    for (var k in o)
        if(new RegExp('(' + k + ')').test(fmt)) 
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[ k ]) : (('00' + o[ k ]).substr(('' + o[ k ]).length)))

    return fmt
}
