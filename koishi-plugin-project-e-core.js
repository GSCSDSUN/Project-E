const { User } = require('koishi-core')
const { segment } = require("koishi-utils");
const { get_qqbind } = require("./utils/esu_utils")
const { get_qqphone } = require("./utils/esu_utils")
const { get_qqlol } = require("./utils/esu_utils")
const { get_lolname } = require("./utils/esu_utils")
const { get_qqlm } = require("./utils/esu_utils")
const { get_weibobind } = require("./utils/esu_utils")
const { get_weibophone } = require("./utils/esu_utils")
const { getPayment } = require("./utils/pay_utils")
const { getRandomTradeNo } = require("./utils/pay_utils")
const { getOrder } = require("./utils/pay_utils")
const { getOrders } = require("./utils/pay_utils")
module.exports.name = 'project-e-core'

module.exports.apply = (ctx) => {
    User.extend(() => ({ coins: 10 }))

    ctx.command("project-e","Project-E 相关功能");
    ctx.command("project-e/userinfo [type] [ID:number]","用户信息").userFields(["id", "name","onebot","authority","coins"])
        .action((ctx,type,ID) => userinfo(ctx,type,ID));
    ctx.command("project-e/sign","签到",{ maxUsage: 1 })
        .userFields(["id"])
        .alias('签到')
        .action((ctx) => sign(ctx));
    ctx.command("project-e/coins","经济相关功能");
    ctx.command("project-e/coins/addcoins [UID:number] [Coins:number]","添加硬币",{ authority : 3})
        .action((ctx,uid,Coins) => addcoins(ctx,uid,Coins));
    ctx.command("project-e/coins/setcoins [UID:number] [Coins:number]","设置硬币",{ authority : 3})
        .action((ctx,uid,Coins) => setcoins(ctx,uid,Coins));
    ctx.command("project-e/coins/pay [UID:number] [Coins:munber]","支付硬币")
        .userFields(["id"])
        .action((ctx,uid,Coins) => pay(ctx,uid,Coins))
    ctx.command("project-e/esu","esu!");
    ctx.command("project-e/esu/qb [QQ:number]","esu! QQ号查询绑定手机")
        .action((ctx,QQ) => {return get_qqbind(QQ)});
    ctx.command("project-e/esu/qf [phone:number]","esu! 手机号查询绑定QQ")
        .action((ctx,phone) => {return get_qqphone(phone)});
    ctx.command("project-e/esu/qqlol [QQ:number]","esu! QQ号查询LOL信息")
        .action((ctx,QQ) => {return get_qqlol(QQ)});
    ctx.command("project-e/esu/lolname [name]","esu! LOL查询QQ信息")
        .action((ctx,QQ) => {return get_lolname(QQ)});
    ctx.command("project-e/esu/qqlm [name]","esu! QQ老密")
        .action((ctx,QQ) => {return get_qqlm(QQ)});
    ctx.command("project-e/esu/wb [name]","esu! 微博通过ID查手机号")
        .action((ctx,QQ) => {return get_weibobind(QQ)});
    ctx.command("project-e/esu/wf [name]","esu! 通过手机号查微博ID")
        .action((ctx,QQ) => {return get_weibophone(QQ)});
    ctx.command("project-e/fakemsg [...rest]","假聊天记录",)
        .action((ctx, ...rest) => fakemsg(ctx,rest));;
    ctx.command("project-e/tts [text]","文本转语音",)
        .action((ctx,text) => tts(ctx,text));
    ctx.command("project-e/payment","支付接口对接");
    ctx.command("project-e/payment/getPayment [type] [money] [name]","获取账单",{ authority : 4})
        .action((ctx,type,money,name) => cmdGetPayment(ctx,type,money,name));
    ctx.command("project-e/payment/getOrder [type:text]","获取订单",{ authority : 4})
        .action((ctx,out_trade_no) => getOrder(ctx,out_trade_no));
}
function cmdGetPayment(ctx,type,money,name) {

    if (type === "alipay") {
        if ((money === undefined || name === undefined)) {
            return "[×] 金额或者商品名不能为空"
        }
        let trade_no = getRandomTradeNo();
        return "支付方式:" + type
            + "\n金额: " + money
            + "\n商品名:" + name
            + "\n订单号: " + trade_no
            + "\n付款链接:" + getPayment("alipay",trade_no,money,name);
    } else if (type === "wxpay") {
        if ((money === undefined || name === undefined)) {
            return "[×] 金额或者商品名不能为空"
        }
        let trade_no = getRandomTradeNo();
        return "支付方式:" + type
            + "\n金额: " + money
            + "\n商品名:" + name
            + "\n订单号: " + trade_no
            + "\n付款链接:" + getPayment("wxpay",trade_no,money,name);
    } else if (type === "qqpay") {
        if ((money === undefined || name === undefined)) {
            return "[×] 金额或者商品名不能为空"
        }
        let trade_no = getRandomTradeNo();
        return "支付方式: " + type
            + "\n金额: " + money
            + "\n商品名:" + name
            + "\n订单号: " + trade_no
            + "\n付款链接:" + getPayment("qqpay",trade_no,money,name);
    } else return "[×] 支付方式错误 必须为 alipay wxpay qqpay";

}



function tts (ctx,text) {
    return "[CQ:tts,text="+text+"]";
}



function fakemsg(ctx,rest) {
    let msgnode = "[";
	if (rest.length === 0 ){
		return "格式 [QQ号] [昵称] [信息] ... [QQ号] [昵称] [信息]"
	}
    if (rest.length % 3 !== 0) {
        return "缺少参数";
    }

    for (let i = 0; i < rest.length; i = i + 3) {

        if (i+3 === rest.length) {
            msgnode = msgnode +
                "{\"type\": \"node\",\"data\": {\"name\": \""+rest[i+1]+"\",\"uin\": \""
                +rest[i]+"\",\"content\": \""+rest[i+2]+"\"}}]"
        } else {
            msgnode = msgnode +
                "{\"type\": \"node\",\"data\": {\"name\": \""+rest[i+1]+"\",\"uin\": \""
                +rest[i]+"\",\"content\": \""+rest[i+2]+"\"}},"
        }
    }
    try {
        ctx.session.bot.$sendGroupForwardMsg(ctx.session.groupId,
            JSON.parse(segment.unescape(msgnode))
        ).then().catch(function (e) {
            return "[X]捕捉到异常\n    " + e.toString();
        })
    }catch (e) {
        return "[X]捕捉到异常\n    " + e.toString();
    }
}

function fakemsg2(ctx,uin,name,msg) {
    console.log(ctx.session.groupId);
    ctx.session.bot.$sendGroupForwardMsg(ctx.session.groupId,
        [{
            type: "node",
            data: {
                name: name,
                uin: uin,
                content: [
                    {
                        type: "text",
                        data: {"text": msg}
                    }
                ]
            }
        }]
    ).then()
}
async function sign(ctx) {
    let random = Math.round(Math.random()*100+50);
    let user = await ctx.session.database.getUser("id", ctx.session.user.id,["id","coins","onebot","name"]);
    let result = "签到成功! 添加硬币: " + random;
    await ctx.session.database.setUser("id", ctx.session.user.id, {coins: parseInt(user.coins) + random});
    result = result + " 当前硬币: " + (parseInt(user.coins) + random);
    return result;
}

async function pay(ctx, QQ, Coins) {
    if ((QQ == undefined) || (Coins == undefined)) {
        return "使用方法 pay <QQ> <Coins> \n给指定UID的用户支付硬币";
    }

    let coins = await ctx.session.database.getUser("id", ctx.session.user.id, ["coins"]);
    let user = await ctx.session.database.getUser("onebot", QQ,["id","coins","onebot","name"]);

    if (user == undefined) {
        return "用户不存在";
    }
    if (coins.coins < Coins) {
        return "硬币不足";
    }

    let result = "已经向 " + QQ + " 支付 " + Coins+ " 当前余额: " + (parseInt( coins.coins ) - parseInt(Coins));

    await ctx.session.database.setUser("onebot" , QQ.toString() ,{coins : parseInt( user.coins ) + parseInt(Coins)});
    await ctx.session.database.setUser("id" , ctx.session.user.id ,{coins : parseInt( user.coins ) - parseInt(Coins)});

    return result;
}

async function setcoins(ctx, QQ, Coins) {
    if ((QQ == undefined) || (Coins == undefined)) {
        return "使用方法 setcoins <QQ> <Coins> \n设置指定UID的用户的硬币数量";
    }

    let user = await ctx.session.database.getUser("onebot", QQ,["id","coins","onebot","name"]);

    if (user == undefined) {
        return "用户不存在";
    }

    if (ctx.session.user.coins < Coins) {

    }

    await ctx.session.database.setUser("onebot" , QQ.toString() ,{coins : parseInt(Coins)});
    await ctx.session.database.setUser("id" , QQ.toString() ,{coins : parseInt(Coins)});

    let result = "已经设置 " + QQ + "的硬币数量" + " 当前硬币: " + Coins;
    return result;
}


async function addcoins(ctx, QQ, Coins) {
    if ((QQ == undefined) || (Coins == undefined)) {
        return "使用方法 addcoins <QQ> <Coins> \n给指定UID的用户添加硬币";
    }
    let user = await ctx.session.database.getUser("onebot", QQ,["id","coins","onebot","name"]);
    if (user == undefined) {
        return "用户不存在";
    }
    let result = "已经为 " + QQ + " 添加 " + Coins+ " 当前硬币: " + (parseInt( user.coins ) + parseInt(Coins));
    await ctx.session.database.setUser("onebot" , QQ.toString() ,{coins : parseInt( user.coins ) + parseInt(Coins)});
    return result;
}


async function userinfo(ctx,type,ID) {
    let users;
    let user = ctx.session.user;
    let coins = await ctx.session.database.getUser("id", user.id, ["coins"]);
    if (type == undefined) {
        return "用户信息\n" + "UID: " + user.id + "\n名称: " + user.name + "\nQQ号: " + user.onebot + "\n权限: " +
            getAuthority(user.authority) + "\n金币: " + coins.coins;
    } else {
        if (type == "qq") {
            users = await ctx.session.database.getUser("onebot", ID,["id","coins","onebot","name","authority"]);
        } else if (type == "uid") {
            users = await ctx.session.database.getUser("id", ID,["id","coins","onebot","name","authority"]);
        } else {
            return "参数 Type 错误 必须为 qq 或者 uid"
        }
        return "用户信息\n" + "UID: " + users.id + "\n名称: " + users.name + "\nQQ号: " + users.onebot + "\n权限: " +
            getAuthority(users.authority) + "\n金币: " + users.coins;
    }

}

function getAuthority(authority) {
    switch (authority) {
        case 0 :
            return "不存在的用户";
        case 1 :
            return "普通用户";
        case 2 :
            return "高级用户";
        case 3 :
            return "管理员";
        case 4 :
            return "高级管理员";
    }
}
