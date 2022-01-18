module.exports = {
    getUser,
    setCoins
}



async function getUser(ctx, type, ID) {
    let users = await ctx.session.database.getUser(type, ID, ["id", "coins", "onebot", "name", "authority"]);
    return users;
}


async function setCoins(ctx, type, ID, coins) {
    await ctx.session.database.setUser(type , ID ,{coins : coins})
}