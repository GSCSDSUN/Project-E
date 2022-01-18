module.exports.name = 'project-e-shop'
const { getCategoryData, getItemByName, getItemByCategory, getItemByID} = require("./utils/item_utils")
const { getCategoryByName } = require("./utils/item_utils")
module.exports.apply = (ctx) => {
    ctx.command("project-e/shop",);
    ctx.command("project-e/shop/查看所有分类 ","查看所有分类",)
        .action((ctx) => lookupCategory(ctx));
    ctx.command("project-e/shop/查看分类下商品 [Category] ","查看分类下商品",)
        .action((ctx,Category) => lookupProducts(ctx,Category));
    ctx.command("project-e/shop/购买 [Items] ","查看分类下商品",)
        .userFields(["id"])
        .action((ctx,Items) => buyProducts(ctx,Items));
}


async function buyProducts(ctx, Items) {

    let items = getItemByName(Items)
    let users = await ctx.session.database.getUser("id", ctx.session.user.id, ["inventory","coins"]);
    if (items !== undefined) {
        if (users.coins < items.price) {
            return "余额不足 当前余额: " + users.coins;
        } else {
            let inventory = JSON.parse(users.inventory)
            for(let i = 0; i < inventory.length; i++) {
                if (inventory[i].name === Items) {
                    return  "你已经有此物品"
                }
            }
            inventory.push(items)
            await ctx.session.database.setUser("id", ctx.session.user.id,{
                coins :parseInt( users.coins ) - parseInt(items.price)
                ,inventory : JSON.stringify(inventory)});
            return  "成功购买商品: " + items.name + "\n当前余额: " + (parseInt( users.coins ) - parseInt(items.price))
        }
    } else {
        return "找不到商品 请使用 请使用 \"查看所有分类\" 查看所有有效的分类"
    }
}


function lookupProducts(ctx,Category) {

    let result = Category + "分类下的商品:\n"
    if (getCategoryByName(Category) !== undefined) {
        let items = getItemByCategory(getCategoryByName(Category).id)
        for(let i = 0; i < items.length; i++) {
            result = result + items[i].name + " 价格:" + items[i].price + "\n";
        }
        return  result + "请使用 购买 <商品名> 进行购买";
    } else {
        return "找不到该分类下的商品 请使用 \"查看所有分类\" 查看所有有效的分类"
    }
}


function lookupCategory(ctx) {
    let Categories = getCategoryData();
    let result = "所有商店分类:\n"
    for (let obj in Categories) {
        result = result + Categories[obj].name + "\n"
    }
    return result + "请使用 查看分类下商品 <分类> 查看分类下的商品"
}
