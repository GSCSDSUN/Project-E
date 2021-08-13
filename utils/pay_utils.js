const querystring = require('querystring')
const crypto = require('crypto')
const axios = require('axios')
module.exports = {
    getPayment,
    getRandomTradeNo,
    getOrder,
    getOrders
}

async function getOrders(ctx) {
    let response;
    console.log(getOrdersUrl())
    try {
        response = await axios.get(getOrdersUrl())
    } catch (e) {
        return "[X]出现了一些严重的问题 \n    " + e.toString();
        console.error();
    }

    return response.data;
}

async function getOrder(ctx,out_trade_no) {
    let response;
    console.log(getOrderUrl(out_trade_no))
    try {
        response = await axios.get(getOrderUrl(out_trade_no))
    } catch (e) {
        return "[X]出现了一些严重的问题 \n    " + e.toString();
        console.error();
    }
    console.log(response.data)
    console.log(out_trade_no)
    var data = JSON.parse(JSON.stringify(response.data));
    if (data.code != 1) {
        return "[X]查询失败 \n    状态:"
            + data.code
            + "\n    信息:" + data.msg;
    } else {
        return "[√]查询成功 \n    状态:" + data.code
            + "\n    信息:" + data.msg
            + "\n    易支付订单号: " + data.trade_no
            + "\n    商户订单号:" + data.out_trade_no
            + "\n    支付方式: " + data.type
            + "\n    创建订单时间: " + data.addtime
            + "\n    完成交易时间: " + data.endtime
            + "\n    商品名称: " + data.name
            + "\n    商品金额: " + data.money
            + "\n    支付状态: " + getStatus(data.status);
    }
    return result;
}

function getStatus(status) {
    if (status === 1) {
        return "支付成功"
    } else if(status === 0) {
        return "未支付";
    } else return status;
}

function getOrdersUrl() {
    const data = {
        act: "orders",
        pid: "389401",
    };
    getSignature(data);
    let result = "https://pay.api-pay.cn/api.php?act=orders&pid=389401&"+"&sign="+getSignature(data)
        +"&sign_type=MD5"
    return result;
}


function getOrderUrl(out_trade_no) {
    const data = {
        act: "order",
        pid: "389401",
        out_trade_no: out_trade_no,
    };
    getSignature(data);
    let result = "https://pay.api-pay.cn/api.php?act=order&pid=389401&out_trade_no="
        +out_trade_no+"&sign="+getSignature(data)
        +"&sign_type=MD5"
    return result;
}


function getPayment(type,out_trade_no,money,name) {
    const data = {
        pid: "389401",
        type: type,
        out_trade_no: out_trade_no,
        notify_url: "https://gscsdsun.github.io/pay/success.html",
        return_url: "https://gscsdsun.github.io/pay/successui.html",
        name : name,
        money: money
    };
    getSignature(data);
    let result = "https://pay.api-pay.cn/api/Pay/submit?pid=389401&type="+type+"&out_trade_no="
        +out_trade_no+"&notify_url=https://gscsdsun.github.io/pay/success.html&return_url=https://gscsdsun.github.io/pay/successui.html&name="
        +name+"&money="
        +money+"&sign="+getSignature(data)
        +"&sign_type=MD5"
    return result;
}

function setTimeDateFmt(s) {  // 个位数补齐十位数
    return s < 10 ? '0' + s : s;
}

function getRandomTradeNo() {
    const now = new Date()
    let month = now.getMonth() + 1
    let day = now.getDate()
    let hour = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()
    month = setTimeDateFmt(month)
    day = setTimeDateFmt(day)
    hour = setTimeDateFmt(hour)
    minutes = setTimeDateFmt(minutes)
    seconds = setTimeDateFmt(seconds)
    let orderCode = now.getFullYear().toString() + month.toString() + day + hour + minutes + seconds + (Math.round(Math.random() * 1000000)).toString();
    return orderCode;
}

function getSignature (data) {
    const sorted = {}

    Object.keys(data)
        .sort()
        .forEach(key => {
            if (data[key] != '' && data[key] != null) sorted[key] = data[key]
        })

    let title = querystring.stringify(sorted)
    title = decodeURIComponent(title)

    const result=md5Hex(new Buffer.from(title + "F18121914AE7942C6193412183990051" , 'utf-8'));

    return result
}

function md5Hex(data) {
    const hash = crypto.createHash('md5');

    const update = buffer => {
        const inputEncoding = typeof buffer === 'string' ? 'utf8' : undefined;
        hash.update(buffer, inputEncoding);
    };

    if (Array.isArray(data)) {
        for (const element of data) {
            update(element);
        }
    } else {
        update(data);
    }

    return hash.digest('hex');
}

