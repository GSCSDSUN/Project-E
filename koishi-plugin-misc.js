const {User} = require("koishi-core");
const {segment} = require("koishi-utils");
module.exports.name = 'project-e-misc'


module.exports.apply = (ctx) => {
    ctx.command("project-e/fakemsg [...rest]","假聊天记录",)
        .action((ctx, ...rest) => fakemsg(ctx,rest));;
    ctx.command("project-e/tts [text]","文本转语音",)
        .action((ctx,text) => tts(ctx,text));
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
