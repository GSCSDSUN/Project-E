module.exports.name = 'qgroup-manager'
const { segment } = require("koishi-utils");
const { Mute } = require("./utils/manager_utils")
const { UnMute } = require("./utils/manager_utils")
const { Kick } = require("./utils/manager_utils")
const { WithDraw } = require("./utils/manager_utils")
const { AllMute } = require("./utils/manager_utils")
module.exports.apply = (ctx) => {
    ctx.command("qgroup-manager","指令群管V1.0");
    ctx.command("qgroup-manager/Mute [qq] [time] [unit]","禁言",{ authority : 3})
        .action((ctx,s,s1,s2)  => cmdMute(ctx,s,s1,s2));
    ctx.command("qgroup-manager/UnMute [qq]","解禁",{ authority : 3})
        .action((ctx,s)  => cmdUnMute(ctx,s));
    ctx.command("qgroup-manager/Kick [qq]","踢出成员",{ authority : 3})
        .action((ctx,s)  => cmdKick(ctx,s));
    ctx.command("qgroup-manager/WithDraw [qq] [amount]","撤回指定成员的消息",{ authority : 3})
        .action((ctx,s,s1)  => cmdWithDraw(ctx,s,s1));
    ctx.command("qgroup-manager/AllMute","开启全员禁言",{ authority : 3})
        .action((ctx)  => cmdAllMute(ctx));
}


async function cmdMute(ctx,qq,time,unit){
  Mute(ctx,qq,time,unit)
}

async function cmdUnMute(ctx,qq){

}

async function cmdKick(ctx,qq){
  
}

async function cmdWithDraw(ctx,qq,amount){


}

async function cmdAllMute(ctx){

}