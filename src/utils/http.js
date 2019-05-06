/**  
 * @author Nassua
 * @desc fetch 数据请求
 * @time 2019-01-26
*/

import { message } from 'antd'
const domainName = 'http://loc.iris.com:3030/cxb/api'
const params = {
    headers: { 'Content-Type': 'application/json; charset=UTF-8' }
}

const Http = (url, option = {}, config = { method: 'POST', isForm: false }) => {
    
    const { method, isForm } = config

    if (method.toUpperCase == 'GET') url = url + (option ? ('?' + formData(option)) : '')
    else {
        params.method = method
        if (isForm) {
            params.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            params.body = formData(option)
        }
        else params.body = JSON.stringify(option)
    }
    
    return fetch(`${domainName + url}`, params).then(callback).catch(error)
}

// 格式化form表单数据
const formData = (data) => {
    let str = ''
    for (let i in data)
        if (data.hasOwnProperty(i)) str = str + i + '=' + data[i] + '&'
    return (str ? str.substring(0, str.length - 1) : '')
}

// fetch 成功后回调
const callback = res => {
    return res.json().then(response => { return response })
}

// fetch 失败后回调
const error = res => {
    message.destroy()
    message.error('请求失败')
}

export default Http
