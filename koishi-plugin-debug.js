const { segment } = require("koishi-utils");
module.exports.name = 'project-e-debug'
module.exports.apply = (ctx) => {
    ctx.command("debug","Project-E 调试插件");
    ctx.command("debug/unescape [text]","unescape") 
        .action((ctx,text) => {return unescape(ctx,text)});
    ctx.command("debug/escape [text]","escape")
        .action((ctx,text) => {return escape(ctx,text)});
}

function escape(ctx,text){
    console.log(segment.escape(text));
    return segment.escape(text);
    
}

function unescape(ctx,text){
    console.log(segment.unescape(text));
    return segment.unescape(text);
}

