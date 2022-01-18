module.exports = {
    getCategoryData,
    getItemData,
    getItemByCategory,
    getItemByID,
    getItemByName,
    getCategoryByName,
}
item_data = {
    "wooden_sword" : {
        id:"wooden_sword",
        name: "木剑",
        category: "weapon",
        attack: 5,
        price: 50,
        hide: false
    },
    "iron_sword" : {
        id:"iron_sword",
        name: "铁剑",
        category: "weapon",
        attack: 10,
        price: 150,
        hide: false
    },
    "diamond_sword" : {
        id:"diamond_sword",
        name: "钻石剑",
        category: "weapon",
        attack: 15,
        price: 200,
        hide: false
    },
    "iron_armor" : {
        id:"iron_armor",
        name: "铁盔甲",
        category: "armor",
        defense: 10,
        price: 100,
        hide: false
    },
    "gold_armor" : {
        id:"gold_armor",
        name: "金盔甲",
        category: "armor",
        defense: 15,
        price: 150,
        hide: false
    },
    "diamond_armor" : {
        id:"diamond_armor",
        name: "钻石盔甲",
        category: "armor",
        defense: 20,
        price: 200,
        hide: false
    },
    "wooden_rod" : {
        id:"wooden_rod",
        name: "木鱼竿",
        category: "fishing_rod",
        luck: 10,
        price: 100,
        hide: false
    },
}


item_category_data = {
    "weapon" : {
        id:"weapon",
        name: "武器",
        attribute: "attack"
    },
    "armor" : {
        id:"armor",
        name: "盔甲",
        attribute: "defense"
    },
    "fishing_rod" : {
        id:"fishing_rod",
        name: "鱼竿",
        attribute: "luck"
    }
}

function getCategoryData () {
    return item_category_data
}
function getItemData () {
    return item_data
}


function getItemByCategory(category) {
    let items = [];
    for (let obj in item_data) {
        if (item_data[obj].category === category) {
            items.push(item_data[obj]);
        }
    }
    return items;
}

function getItemByID(ID) {
    return item_data[ID];
}
function getCategoryByName(name) {
    for (let obj in item_category_data ) {
        if (item_category_data[obj].name === name) {
            return item_category_data[obj];
        }
    }
}
function getItemByName(name) {
    for (let obj in item_data) {
        if (item_data[obj].name === name) {
            return item_data[obj];
        }
    }
}