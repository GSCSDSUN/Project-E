const axios = require('axios')
module.exports = {
    get_qqbind,
    get_qqlm,
    get_weibobind,
    get_lolname,
    get_weibophone,
    get_qqlol,
    get_qqphone
}



async function get_qqbind(qq) {
    try{
        response = await axios.get("https://zy.xywlapi.cc/qqcx?qq=" + encodeURI(qq))
    } catch (e) {
        return "[X]出现了一些严重的问题 \n    " + e.toString();
        console.error();
    }

    var data = JSON.parse(JSON.stringify(response.data));

    if (data.status == undefined){
        return  "[X]查询失败"
                + "\n    信息:" + data.msg;
    } else {
        return "[√]查询成功 \n    状态:" + data.status
            + "\n    信息:" + data.message
            + "\n    QQ：" + qq
            + "\n    绑定的号码:" + data.phone
            + "\n    绑定的号码的地区:" + data.phonediqu;
    }
    return result;
}
async function get_qqphone(phone) {
    try{
        response = await axios.get("https://cxx.yun7.me/qqphone?phone=" + encodeURI(phone))
    } catch (e) {
        return "[X]出现了一些严重的问题 \n    " + e.toString();
        console.error();
    }

    var data = JSON.parse(JSON.stringify(response.data));
    if (data.status == 500){
        return  "[X]查询失败 \n    状态:"
            + data.status
            + "\n    信息:" + data.message;
    } else {
        return "[√]查询成功 \n    状态:" + data.status
            + "\n    信息:" + data.message
            + "\n    QQ:" + data.qq
            + "\n    绑定的号码:" + phone
            + "\n    绑定的号码的地区:" + data.phonediqu;
    }
    return result;
}
async function get_qqlol(phone) {
    try{
        response = await axios.get("https://cxx.yun7.me/qqlol?qq=" + encodeURI(phone))
    } catch (e) {
        return "[X]出现了一些严重的问题 \n    " + e.toString();
        console.error();
    }

    var data = JSON.parse(JSON.stringify(response.data));
    if (data.status == 500){
        return  "[X]查询失败 \n    状态:"
            + data.status
            + "\n    信息:" + data.message;
    } else {
        return "[√]查询成功 \n    状态:" + data.status
            + "\n    信息:" + data.message
            + "\n    QQ:" + data.qq
            + "\n    LOL昵称:" + data.name
            + "\n    LOL游玩的大区:" + data.daqu;
    }
    return result;
}
async function get_lolname(name) {
    try{
        response = await axios.get("https://cxx.yun7.me/lolname?name=" + encodeURI(name))
    } catch (e) {
        return "[X]出现了一些严重的问题 \n    " + e.toString();
        console.error();
    }


    var data = JSON.parse(JSON.stringify(response.data));
    if (data.status == 500){
        return  "[X]查询失败 \n    状态:"
            + data.status
            + "\n    信息:" + data.message;
    } else {
        return "[√]查询成功 \n    状态:" + data.status
            + "\n    信息:" + data.message
            + "\n    QQ:" + data.qq
            + "\n    LOL昵称:" + data.name
            + "\n    LOL游玩的大区:" + data.daqu;
    }
    return result;
}
async function get_qqlm(qq) {
    try{
        response = await axios.get("https://cxx.yun7.me/qqlm?qq=" + encodeURI(qq))
    } catch (e) {
        return "[X]出现了一些严重的问题 \n    " + e.toString();
        console.error();
    }
    var data = JSON.parse(JSON.stringify(response.data));
    if (data.status == 500){
        return  "[X]查询失败 \n    状态:"
            + data.status
            + "\n    信息:" + data.message;
    } else {
        return "[√]查询成功 \n    状态:" + data.status
            + "\n    信息:" + data.message
            + "\n    查询的QQ号:" + qq
            + "\n    查询QQ可能的老密:" + data.qqlm;
    }
    return result;
}
async function get_weibobind(weibo) {
    try{
        response = await axios.get("https://cxx.yun7.me/wbapi?id=" + encodeURI(weibo))
    } catch (e) {
        return "[X]出现了一些严重的问题 \n    " + e.toString();
        console.error();
    }

    var data = JSON.parse(JSON.stringify(response.data));
    if (data.status == 500){
        return  "[X]查询失败 \n    状态:"
            + data.status
            + "\n    信息:" + data.message;
    } else {
        return "[√]查询成功 \n    状态:" + data.status
            + "\n    信息:" + data.message
            + "\n    微博ID:" + data.id
            + "\n    绑定的号码:" + data.phone
            + "\n    绑定的号码的地区:" + data.phonediqu;
    }
    return result;
}
async function get_weibophone(phone) {
    try{
        response = await axios.get("https://cxx.yun7.me/wbphone?phone=" + encodeURI(phone))
    } catch (e) {
        return "[X]出现了一些严重的问题 \n    " + e.toString();
        console.error();
    }

    var data = JSON.parse(JSON.stringify(response.data));
    if (data.status == 500){
        return  "[X]查询失败 \n    状态:"
            + data.status
            + "\n    信息:" + data.message;
    } else {
        return "[√]查询成功 \n    状态:" + data.status
            + "\n    信息:" + data.message
            + "\n    微博ID:" + data.id
            + "\n    绑定的号码:" + data.phone
            + "\n    绑定的号码的地区:" + data.phonediqu;
    }
    return result;
}