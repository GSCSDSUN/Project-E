const axios = require("axios");
module.exports = {
    getSetu
}

async function getSetu(r18) {
    if (r18) {

    } else {
        try {
            response = await axios.get("https://api.lolicon.app/setu/v2?r18=0")
        } catch (e) {
            return "[X]出现了一些严重的问题 \n    " + e.toString();
            console.error();
        }

        var data = JSON.parse(JSON.stringify(response.data));


        return "[CQ:image,file=" + data.data[0].urls.original + "]" + "\nTitle:" + data.data[0].title +
            "\nLink: https://www.pixiv.net/i/" + data.data[0].pid +
            "\nAuthor: https://www.pixiv.net/u/" + data.data[0].uid

    }
}