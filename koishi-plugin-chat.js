const { getReply } = require("./utils/anime_thesaurus_util")
const { Channel } = require('koishi-core')
const { Database } = require('koishi-core')
module.exports.name = 'project-e-chat'
module.exports.apply = (ctx) => {

    Database.extend('koishi-plugin-mysql', ({ tables }) => {
        tables.channel.chat = 'int'
    })
    Channel.extend(() => ({ chat: 0 }))
    ctx.command("chat [enable]","文爱bot",{ authority : 4})
        .action((ctx,enable) => {return cmd_chat(ctx,enable)});
    ctx.middleware(async (session, next) => {
        if (session.parsed.appel) {
            let reply = getReply(session.content)
            if (reply !== undefined) {
                channel = await session.database.getChannel("onebot", session.channelId, ["id", "chat"])
                if (channel.chat === 1) {
                    await session.send(reply)
                }
            }
        }
        await next()
    })
}

async function cmd_chat(ctx, enable) {
    let channel = await ctx.session.database.getChannel("onebot", ctx.session.channelId, ["id", "chat"])
    if (enable === "enable") {
        await ctx.session.database.setChannel("onebot", ctx.session.channelId, {chat: 1});
        return "文爱姬已启动"
    } else {
        if (enable === "disable") {
            await ctx.session.database.setChannel("onebot", ctx.session.channelId, {chat: 0});
            return "文爱姬已关闭"
        }
    }
    if (channel.chat === 1) {
        return "文爱姬目前状态\n已启动"
    } else {
        return "文爱姬目前状态\n已关闭"
    }

}