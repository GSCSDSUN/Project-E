const {User} = require("koishi-core");
const { getItemByID } = require("./utils/item_utils")
module.exports.name = 'project-e-inventory'


module.exports.apply = (ctx) => {
    User.extend(() => ({ inventory: "[]" , items: "[{fishing_rod: null ,armor: null ,weapon: null}]"}))

    ctx.command("project-e/inventory","背包");
    ctx.command("project-e/inventory/查看背包 ","查看背包",)
        .userFields(["id"])
        .action((ctx) => lookupInventory(ctx));
    ctx.command("project-e/inventory/给予物品 [QQ] [ItemID]","给予物品",{ authority : 3})
        .userFields(["id"])
        .action((ctx,QQ,ItemID) => giveItems(ctx,QQ,ItemID));
    ctx.command("project-e/inventory/1","查看装备")
        .userFields(["id"])
        .action((ctx) => lookUpItems(ctx))
    ctx.command("project-e/inventory/使用装备 [ItemID]","使用装备")
        .userFields(["id"])
        .action((ctx,ItemID) => useItems(ctx,ItemID))
}
async function useItems(ctx,ItemID) {
    let user = await ctx.session.database.getUser("id", ctx.session.user.id,["inventory","items"]);

    let inventory = JSON.parse(user.inventory)
    let items = JSON.parse(user.items)
    for(let i = 0; i < inventory.length; i++) {
        if (inventory[i].name === ItemID) {
            if (inventory[i].category === "weapon") {
                items[0].weapon = inventory[i].id
                await ctx.session.database.setUser("id", ctx.session.user.id,{
                    items : JSON.stringify(items)});
                return "已装备 武器 :" + ItemID

            }
            if (inventory[i].category === "armor") {
                items[0].armor = inventory[i].id
                console.log(JSON.stringify(items))
                await ctx.session.database.setUser("id", ctx.session.user.id,{
                    items : JSON.stringify(items)});
                return "已装备 护甲: " + ItemID
            }
            if (inventory[i].category === "fishing_rod") {
                items[0].fishing_rod = inventory[i].id
                await ctx.session.database.setUser("id", ctx.session.user.id,{
                    items : JSON.stringify(items)});
                return "已装备 鱼竿: " + ItemID
            }
        }
    }


    return "你未拥有或者此装备\n 使用购买 <物品名称> 购买";
}

async function lookUpItems(ctx) {
    let user = await ctx.session.database.getUser("id", ctx.session.user.id,["inventory","items"]);
    let items = JSON.parse(user.items)
    console.log(items[0].fishing_rod !== null)
    let result = "当前装备\n";
    if (items[0].weapon !== null) {
        console.log(1)
        result = result+ "盔甲: " + getItemByID(items[0].weapon ).name + " 防御加成: "
            + getItemByID(items[0].weapon).attack +"\n"
    }

    if (items[0].armor !== null) {
        console.log(2)
        result = result+ "武器: " + getItemByID(items[0].armor ).name + " 攻击加成: "
            + getItemByID(items[0].armor).defense+"\n"
    }

    if (items[0].fishing_rod !== null) {
        console.log(3)
        result = result+ "鱼竿: " + getItemByID(items[0].fishing_rod ).name + " 幸运加成: "
            + getItemByID(items[0].fishing_rod ).luck+"\n"
    }

    return result;
}
async function giveItems(ctx,QQ , ItemID) {
    let user = await ctx.session.database.getUser("onebot", QQ,["inventory"]);
    let inventory = JSON.parse(user.inventory)
    if (getItemByID(ItemID) !== undefined){
        inventory.push(getItemByID(ItemID))
    } else {
        return "找不到此物品"
    }
    await ctx.session.database.setUser("onebot", QQ,{inventory : JSON.stringify(inventory)});
    return "已经为你添加: " + getItemByID(ItemID).name;
}
async function lookupInventory(ctx) {
    let user = await ctx.session.database.getUser("id", ctx.session.user.id, ["inventory"]);
    let inventory = JSON.parse(user.inventory)
    let result = "你的背包:\n"
    for(let i = 0; i < inventory.length; i++) {
        result = result + inventory[i].name + "\n";
    }
    return result;
}
