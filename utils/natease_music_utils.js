const axios = require('axios')
module.exports = {
    searchSongs,
    getSongs
}
api = "http://127.0.0.1:8081/api/netease/"


async function searchSongs(s) {
    let response;
    try {
        response = await axios.get(encodeURI(api+"search?s="+s))
    } catch (e) {
        return "[X]出现了一些严重的问题 \n    " + e.toString();
        console.error();
    }
    var data = JSON.parse(JSON.stringify(response.data));
    //console.log(data.result.songs[0].name)
    return response.data;
}


async function getSongs(id) {
    let response;
    try {
        response = await axios.get(encodeURI(api+"song?id="+id+"&br=320000"))
    } catch (e) {
        return "[X]出现了一些严重的问题 \n    " + e.toString();
        console.error();
    }
    var data = JSON.parse(JSON.stringify(response.data));
    //console.log(data.result.songs[0].name)
    return response.data;
}