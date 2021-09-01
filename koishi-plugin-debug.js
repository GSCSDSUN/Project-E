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

vmess://eyJhZGQiOiI0Ny4yNDIuNTkuMjI4IiwiYWlkIjoiMCIsImhvc3QiOiIiLCJpZCI6IjE4MGY4ZDc5LWVjYzQtNDc3Yi1iZTg3LWRlODMxYzk1MjhlOSIsIm5ldCI6IndzIiwicGF0aCI6IiIsInBvcnQiOiIxMTQ1MiIsInBzIjoiaXBfNDcuMjQyLjU5LjIyOCIsInNjeSI6ImF1dG8iLCJzbmkiOiIiLCJ0bHMiOiIiLCJ0eXBlIjoiIiwidiI6IjIifQ==
