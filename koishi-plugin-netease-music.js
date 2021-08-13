module.exports.name = 'netease-music'
const { segment } = require("koishi-utils");
const { searchSongs } = require("./utils/natease_music_utils")
const { getSongs } = require("./utils/natease_music_utils")
module.exports.apply = (ctx) => {
    ctx.command("netease","网易云音乐");
    ctx.command("netease/网易云 [s]","网易云点歌")
        .action((ctx,s)  => cmdGetSongs(ctx,s));
    ctx.command("netease/play [id]","网易云点歌")
        .action((ctx,s)  => cmdPlaySongs(ctx,s));
    ctx.command("netease/播放 [songs]","网易云点歌")
        .action((ctx,s)  => playSongs(ctx,s));
    ctx.command("netease/解析 [songs]","网易云点歌")
        .action((ctx,s)  => resolveSongs(ctx,s));
    ctx.command("netease/解析id [id]","网易云点歌")
        .action((ctx,s)  => resolveSongsid(ctx,s));
}

async function resolveSongsid(ctx,s) {
    let songData = await getSongs(s)
    console.log(songData)
    if (songData.data[0].url == null) {
        return "找不到此歌曲 请输入正确的歌曲ID"
    }
    return "歌曲ID : " + s
        + "\n下载URL : " +songData.data[0].url;



}


async function resolveSongs(ctx,s) {
    let data = await searchSongs(s)
    let ar = ""
    if (data.result.songCount == 0) {
        return "没有任何结果"
    }
    let songData = await getSongs(data.result.songs[0].id)
    for (let i = 0; i <= data.result.songs[0].ar.length - 1; i++) {
        if (i != data.result.songs[0].ar.length - 1) {
            console.log(i)
            ar = ar + data.result.songs[0].ar[i].name + "/"
        } else {
            ar = ar + data.result.songs[0].ar[i].name
            continue;
        }

    }
    return ar + " - " + data.result.songs[0].name
        + "\n链接 : " + "http://music.163.com/song?id=" + data.result.songs[0].id
        + "\n歌曲ID : " + data.result.songs[0].id
        + "\n下载URL : " +songData.data[0].url;



}
async function playSongs(ctx,s) {
    let data = await searchSongs(s)
    let ar = ""
    if (data.result.songCount == 0) {
        return "没有任何结果"
    }
    let songData = await getSongs(data.result.songs[0].id)
    for (let i = 0; i <= data.result.songs[0].ar.length - 1; i++) {
        if (i != data.result.songs[0].ar.length - 1) {
            console.log(i)
            ar = ar + data.result.songs[0].ar[i].name + "/"
        } else {
            ar = ar + data.result.songs[0].ar[i].name
            continue;
        }

    }
    ctx.session.send("正在播放\n"
        + ar + " - " + data.result.songs[0].name
        + "\n链接 : " + "http://music.163.com/song?id=" + data.result.songs[0].id
        + "\n歌曲ID : " + data.result.songs[0].id)
    return "[CQ:record,file=" + songData.data[0].url + "]"


}

async function cmdPlaySongs(ctx,s) {
    let data = await getSongs(s)
    console.log(data)
    if (data.data[0].url == null) {
        return "找不到此歌曲 请输入正确的歌曲ID"
    }
    return "[CQ:record,file=" + data.data[0].url + "]"
}

async function cmdGetSongs(ctx, s) {
    let data = await searchSongs(s)
    let ar = ""
    if (data.result.songCount == 0) {
        return "没有任何结果"
    }
    console.log(data.result.songs[0].ar.length)
    for (let i = 0; i <= data.result.songs[0].ar.length - 1; i++) {
        if (i != data.result.songs[0].ar.length - 1) {
            console.log(i)
            ar = ar + data.result.songs[0].ar[i].name + "/"
        } else {
            ar = ar + data.result.songs[0].ar[i].name
            continue;
        }

    }
    return ar + " - " + data.result.songs[0].name
        + "\n链接 : " + "http://music.163.com/song?id=" + data.result.songs[0].id
        + "\n歌曲ID : " + data.result.songs[0].id

}