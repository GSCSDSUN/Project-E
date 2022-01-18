const { User, Database,Tables} = require('koishi-core')
const { getUser } = require("./utils/coins_utils")
module.exports.name = 'project-e-core'




module.exports.apply = (ctx) => {


    User.extend(() => ({ coins: 10 ,bank: 10 ,level: 1 , experience: 0}))

    ctx.command("project-e","Project-E 相关功能");
    ctx.command("project-e/userinfo [type] [ID:number]","用户信息").userFields(["id", "name","onebot","authority","coins"])
        .action((ctx,type,ID) => userinfo(ctx,type,ID));

    ctx.command("project-e/sign","签到",{ maxUsage: 1 })
        .userFields(["id"])
        .alias('签到')
        .action((ctx) => sign(ctx));

    ctx.command("project-e/level","等级相关功能");
    ctx.command("project-e/level/addexp [UID:number] [Experience:number]","添加经验",{ authority : 3})
        .action((ctx,uid,Experience) => addExperience(ctx,uid,Experience));
    ctx.command("project-e/level/setexp [UID:number] [Experience:number]","设置经验",{ authority : 3})
        .action((ctx,uid,Experience) => setExperience(ctx,uid,Experience));
    ctx.command("project-e/level/addlevel [UID:number] [Level:number]","添加经验",{ authority : 3})
        .action((ctx,uid,Level) => addLevel(ctx,uid,Level));
    ctx.command("project-e/level/setlevel [UID:number] [Level:number]","设置等级",{ authority : 3})
        .action((ctx,uid,Level) => setLevel(ctx,uid,Level));
    ctx.command("project-e/level/升级","升级")
        .userFields(["id"])
        .action((ctx) => upgradeLevel(ctx));

    ctx.command("project-e/coins","经济相关功能");
    ctx.command("project-e/coins/addcoins [UID:number] [Coins:number]","添加猫粮",{ authority : 3})
        .action((ctx,uid,Coins) => addcoins(ctx,uid,Coins));
    ctx.command("project-e/coins/setcoins [UID:number] [Coins:number]","设置猫粮",{ authority : 3})
        .action((ctx,uid,Coins) => setcoins(ctx,uid,Coins));
    ctx.command("project-e/coins/pay [UID:number] [Coins:munber]","支付猫粮")
        .userFields(["id"])
        .action((ctx,uid,Coins) => pay(ctx,uid,Coins))
    ctx.command("project-e/coins/setcoins [UID:number] [Coins:number]","设置猫粮",{ authority : 3})
        .action((ctx,uid,Coins) => setcoins(ctx,uid,Coins));

    ctx.command("project-e/bank","银行功能");
    ctx.command("project-e/bank/取猫粮 [Coins:number]","取出猫粮")
        .userFields(["id", "name","onebot","authority","coins"])
        .action((ctx,Coins) => getCoins(ctx,Coins));
    ctx.command("project-e/bank/存猫粮 [Coins:number]","存猫粮")
        .userFields(["id", "name","onebot","authority","coins"])
        .action((ctx,Coins) => saveCoins(ctx,Coins));
}



async function upgradeLevel(ctx) {
    let user = await ctx.session.database.getUser("id", ctx.session.user.id, ["level","experience"]);

    let levelUpExperience = 100 + (user.level - 1 ) * 50
    if (user.experience < levelUpExperience) {
        return "经验不足\n需要经验: " + levelUpExperience + "\n当前经验: " + user.experience;
    }

    let result = "等级提升! \n当前等级: " + (parseInt( user.level ) + 1) + "\n消耗经验: " +levelUpExperience + "\n当前经验: " +
        (parseInt( user.experience ) - levelUpExperience);

    await ctx.session.database.setUser("id" , ctx.session.user.id ,{experience : parseInt( user.experience ) - parseInt(levelUpExperience),
        level: (parseInt( user.level ) + 1)});

    return result;
}

async function addLevel(ctx, QQ, Level) {
    if ((QQ === undefined) || (Level === undefined)) {
        return "使用方法 addLevel <QQ> <Level> \n给指定UID的用户添加等级";
    }
    let user = await ctx.session.database.getUser("onebot", QQ,["id","level","onebot","name"]);
    if (user === undefined) {
        return "用户不存在";
    }
    let result = "已经为 " + QQ + " 添加 " + Level+ " 当前等级: " + (parseInt( user.level ) + parseInt(Level));
    await ctx.session.database.setUser("onebot" , QQ.toString() ,{level : parseInt( user.level ) + parseInt(Level)});
    return result;
}


async function setLevel(ctx, QQ, Level) {
    if ((QQ === undefined) || (Level === undefined)) {
        return "使用方法 setLevel <QQ> <level> \n设置指定UID的用户的等级";
    }

    let user = await ctx.session.database.getUser("onebot", QQ, ["id", "level", "onebot", "name"]);

    if (user === undefined) {
        return "用户不存在";
    }


    await ctx.session.database.setUser("onebot", QQ.toString(), {level: parseInt(Level)});
    await ctx.session.database.setUser("id", QQ.toString(), {level: parseInt(Level)});

    return "已经设置 " + QQ + "的等级" + " 当前等级: " + Level;
}

async function addExperience(ctx, QQ, Experience) {
    if ((QQ === undefined) || (Experience === undefined)) {
        return "使用方法 addexp <QQ> <Coins> \n给指定UID的用户添加猫粮";
    }
    let user = await ctx.session.database.getUser("onebot", QQ,["id","experience","onebot","name"]);
    if (user === undefined) {
        return "用户不存在";
    }
    let result = "已经为 " + QQ + " 添加 " + Experience+ " 当前经验: " + (parseInt( user.experience ) + parseInt(Experience));
    await ctx.session.database.setUser("onebot" , QQ.toString() ,{experience : parseInt( user.experience ) + parseInt(Experience)});
    return result;
}

async function setExperience(ctx, QQ, Experience) {
    if ((QQ === undefined) || (Experience === undefined)) {
        return "使用方法 setexp <QQ> <experience> \n设置指定UID的用户的经验";
    }

    let user = await ctx.session.database.getUser("onebot", QQ, ["id", "experience", "onebot", "name"]);

    if (user === undefined) {
        return "用户不存在";
    }


    await ctx.session.database.setUser("onebot", QQ.toString(), {experience: parseInt(Experience)});
    await ctx.session.database.setUser("id", QQ.toString(), {experience: parseInt(Experience)});

    return "已经设置 " + QQ + "的经验" + " 当前经验: " + Experience;
}








async function saveCoins(ctx, Coins) {
    if ((Coins == undefined)) {
        return "使用方法 存猫粮 <Coins> \n向银行存猫粮";
    }


    let user = await ctx.session.database.getUser("id", ctx.session.user.id,["coins","bank"]);

    if (user.coins < Coins) {
        return "猫粮不足";
    }

    let result = "已经存入银行 " + Coins+ " \n当前余额: " + (parseInt( user.coins ) - parseInt(Coins)) + "\n银行当前余额: "
        + (parseInt( user.bank ) + parseInt(Coins));

    await ctx.session.database.setUser("id" , ctx.session.user.id ,{bank : parseInt( user.bank ) + parseInt(Coins)});
    await ctx.session.database.setUser("id" , ctx.session.user.id ,{coins : parseInt( user.coins ) - parseInt(Coins)});
    return result;
}





async function getCoins(ctx, Coins) {
    if ((Coins == undefined)) {
        return "使用方法 取猫粮 <Coins> \n向银行取猫粮";
    }
    let user = await ctx.session.database.getUser("id", ctx.session.user.id, ["coins","bank"]);
    if (user.bank < Coins) {
        return "猫粮不足";
    }
    let result = "已经从银行取出 " + Coins+ " \n当前余额: " + (parseInt( user.coins ) - parseInt(Coins)) + "\n银行当前余额: "
        + (parseInt( user.bank ) + parseInt(Coins));
    await ctx.session.database.setUser("id" , ctx.session.user.id ,{bank : parseInt( user.bank ) - parseInt(Coins)});
    await ctx.session.database.setUser("id" , ctx.session.user.id ,{coins : parseInt( user.coins ) + parseInt(Coins)});
    return result;
}



async function sign(ctx) {
    let random = Math.round(Math.random()*100+50);
    let randomexp = Math.round(Math.random()*100+50);
    let user = await ctx.session.database.getUser("id", ctx.session.user.id,["id","coins","experience","onebot","name"]);
    let result = "签到成功! \n添加猫粮: " + random + "\n添加经验: " + randomexp;
    await ctx.session.database.setUser("id", ctx.session.user.id, {coins: parseInt(user.coins) + random, experience: parseInt(user.experience) + randomexp});
    result = result + " \n当前猫粮: " + (parseInt(user.coins) + random)+ " \n当前经验: " + (parseInt(user.experience) + randomexp);
    return result;
}




async function pay(ctx, QQ, Coins) {
    if ((QQ == undefined) || (Coins == undefined)) {
        return "使用方法 pay <QQ> <Coins> \n给指定UID的用户支付猫粮";
    }

    let coins = await ctx.session.database.getUser("id", ctx.session.user.id, ["coins"]);
    let user = await ctx.session.database.getUser("onebot", QQ,["id","coins","onebot","name"]);

    if (user == undefined) {
        return "用户不存在";
    }
    if (coins.coins < Coins) {
        return "猫粮不足";
    }

    let result = "已经向 " + QQ + " 支付 " + Coins+ " 当前余额: " + (parseInt( coins.coins ) - parseInt(Coins));

    await ctx.session.database.setUser("onebot" , QQ.toString() ,{coins : parseInt( user.coins ) + parseInt(Coins)});
    await ctx.session.database.setUser("id" , ctx.session.user.id ,{coins : parseInt( coins.coins ) - parseInt(Coins)});

    return result;
}

async function setcoins(ctx, QQ, Coins) {
    if ((QQ == undefined) || (Coins == undefined)) {
        return "使用方法 setcoins <QQ> <Coins> \n设置指定UID的用户的猫粮数量";
    }

    let user = await ctx.session.database.getUser("onebot", QQ,["id","coins","onebot","name"]);

    if (user == undefined) {
        return "用户不存在";
    }


    await ctx.session.database.setUser("onebot" , QQ.toString() ,{coins : parseInt(Coins)});
    await ctx.session.database.setUser("id" , QQ.toString() ,{coins : parseInt(Coins)});

    let result = "已经设置 " + QQ + "的猫粮数量" + " 当前猫粮: " + Coins;
    return result;
}


async function addcoins(ctx, QQ, Coins) {
    if ((QQ == undefined) || (Coins == undefined)) {
        return "使用方法 addcoins <QQ> <Coins> \n给指定UID的用户添加猫粮";
    }
    let user = await ctx.session.database.getUser("onebot", QQ,["id","coins","onebot","name"]);
    if (user == undefined) {
        return "用户不存在";
    }
    let result = "已经为 " + QQ + " 添加 " + Coins+ " 当前猫粮: " + (parseInt( user.coins ) + parseInt(Coins));
    await ctx.session.database.setUser("onebot" , QQ.toString() ,{coins : parseInt( user.coins ) + parseInt(Coins)});
    return result;
}


async function userinfo(ctx,type,ID) {
    let users;
    let user = ctx.session.user;
    let coins = await ctx.session.database.getUser("id", user.id, ["coins","bank","experience","level"]);
    if (type == undefined) {
        return "用户信息\n" + "UID: " + user.id + "\n名称: " + user.name + "\nQQ号: " + user.onebot + "\n权限: " +
            getAuthority(user.authority) + "\n等级: " + coins.level+"\n经验: " + coins.experience+ "\n猫粮: " + coins.coins + "\n银行余额: " + coins.bank;
    } else {
        if (type == "qq") {
            users = await ctx.session.database.getUser("onebot", ID,["id","coins","onebot","name","authority","bank","experience","level"]);
        } else if (type == "uid") {
            users = await ctx.session.database.getUser("id", ID,["id","coins","onebot","name","authority","bank","experience","level"]);
        } else {
            return "参数 Type 错误 必须为 qq 或者 uid"
        }
        return "用户信息\n" + "UID: " + users.id + "\n名称: " + users.name + "\nQQ号: " + users.onebot + "\n权限: " +
            getAuthority(users.authority) + "\n等级: " + coins.level+"\n经验: " + coins.experience+ "\n猫粮: " + users.coins + "\n银行余额: " + users.bank+ "\n等级: " + users.level+"\n经验: " + users.experience;
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
