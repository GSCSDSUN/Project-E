const {User} = require("koishi-core");
const {
    get_qqbind,
    get_qqphone,
    get_qqlol,
    get_lolname,
    get_qqlm,
    get_weibobind,
    get_weibophone
} = require("./utils/esu_utils");
const {getOrder} = require("./utils/pay_utils");
module.exports.name = 'project-e-esu'
module.exports.apply = (ctx) => {

    ctx.command("project-e/esu","esu! 恶俗模块已限制仅管理员使用",{ authority : 4});
    ctx.command("project-e/esu/qb [QQ:number]","esu! QQ号查询绑定手机",{ authority : 4})
        .action((ctx,QQ) => {if (QQ==3252344807) { return "nmsl" } else return get_qqbind(QQ)});
    ctx.command("project-e/esu/qf [phone:number]","esu! 手机号查询绑定QQ",{ authority : 4})
        .action((ctx,phone) => {return get_qqphone(phone)});
    ctx.command("project-e/esu/qqlol [QQ:number]","esu! QQ号查询LOL信息",{ authority : 4})
        .action((ctx,QQ) => {return get_qqlol(QQ)});
    ctx.command("project-e/esu/lolname [name]","esu! LOL查询QQ信息",{ authority : 4})
        .action((ctx,QQ) => {return get_lolname(QQ)});
    ctx.command("project-e/esu/qqlm [name]","esu! QQ老密",{ authority : 4})
        .action((ctx,QQ) => {return get_qqlm(QQ)});
    ctx.command("project-e/esu/wb [name]","esu! 微博通过ID查手机号",{ authority : 4})
        .action((ctx,QQ) => {return get_weibobind(QQ)});
    ctx.command("project-e/esu/wf [name]","esu! 通过手机号查微博ID",{ authority : 4})
        .action((ctx,QQ) => {return get_weibophone(QQ)});
}