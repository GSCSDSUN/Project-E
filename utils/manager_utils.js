const axios = require('axios')
module.exports = {
    Mute,
    UnMute,
    Kick,
    WithDraw,
    AllMute
}

async function Mute(ctx,qq,time,unit){
   var Fduration
   console.log(qq)
   if(qq.indexOf("[CQ") != -1){
    var cq
    var cqtemp
   	cq = qq
    cqtemp = /id=(.*?)]/.exec(cq)
    console.log(cqtemp)
    qq = cqtemp[1]
   } 
   if(unit == "d" || unit == "天" || unit == "day"){
   	Fduration = parseInt(time)*86400
   }else if(unit == "m" || unit == "分钟" || unit == "minute"){
   	Fduration = parseInt(time)*60
   }else if(unit == "h" || unit == "小时" || unit == "hour"){
   	Fduration = parseInt(time)*3600
   }else if(unit == "w" || unit == "周" || unit == "week"){
   	Fduration = parseInt(time)*604800
   }else{
   	ctx.session.send("时间单位错误，请输入正确的时间单位。（s/m/h/w）或（秒/分钟/小时/周）或其英文全名")
   	return
   }
   if(Fduration<60){
   	Fduration = 60
   	ctx.session.bot.$setGroupBan(ctx.session.groupId, parseInt(qq), Fduration)
   	ctx.session.send("操作执行成功！\n 但您的操作tick不足最低值1分钟，已经调整为1分钟")
   }else if(Fduration>2592000){
   	Fduration = 2592000
   	ctx.session.bot.$setGroupBan(ctx.session.groupId, parseInt(qq), Fduration)
   	ctx.session.send("操作执行成功！\n 但您的操作tick超过最高值1个月，已经调整为1个月")
   }else{  
    ctx.session.bot.$setGroupBan(ctx.session.groupId, parseInt(qq), Fduration)
    ctx.session.send("操作执行成功！")
    }

}

async function UnMute(ctx,qq){

}

async function Kick(ctx,qq){
  
}

async function WithDraw(ctx,qq,amount){


}

async function AllMute(ctx){

}