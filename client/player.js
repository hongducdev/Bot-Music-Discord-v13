const { DisTube } = require('distube');
const client = require("../index.js");
const { MessageEmbed } = require('discord.js');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YouTubeDLPlugin } = require("@distube/yt-dlp")
const { cookie } = require('../config.json');
const Format = Intl.NumberFormat();
const config = require('../config.json');
let spotifyoptions = {
  parallel: true,
  emitEventsAfterFetching: false
};

client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: true,
  youtubeCookie: `${cookie}`,
  plugins: [
    new SpotifyPlugin(spotifyoptions),
    new SoundCloudPlugin()
  ]
})
if(config.spotifyapi.enabled) {
  spotifyoptions.api = {
    clientId: config.spotifyapi.clientId,
    clientSecret: config.spotifyapi.clientSecret,
  }}

const status = queue =>
  `Âm lượng: \`${queue.volume}%\` | Bộ lọc: \`${queue.filters.join(', ') || 'Tắt'}\` | Lặp: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'Danh sách phát' : 'Bài hát') : 'Tắt'
  }\` | Autoplay: \`${queue.autoplay ? 'Bật' : 'Tắt'}\``

client.distube.on('addSong', (queue, song) =>
  queue.textChannel.send({embeds: [
      new MessageEmbed()
      .setColor('#ccff48')
      .setAuthor({name: 'Đã thêm...', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
      .setDescription(`[${song.name}](${song.url})`)
      .setThumbnail(song.thumbnail)
      .addField("🔷 | Trạng thái", `
      ┕${status(queue).toString()}`, false)
        .addField('👀 | Lượt nghe', `
        ┕${Format.format(song.views)}`, true)
        .addField('👍 | Thích', `
        ┕${Format.format(song.likes)}`, true)
        .addField('👎 | Không thích', `
        ┕${Format.format(song.dislikes)}`, true)
        .addField('⌛ | Thời gian', `
        ┕${song.formattedDuration}`, true)
        .addField("👌 | Yêu cầu bởi",`
        ┕${song.user}`, true)
  ]})
)

client.distube.on('addList', (queue, playlist) =>
    queue.textChannel.send({embeds: [
        new MessageEmbed()
        .setColor('#ccff48')
        .setAuthor({name: 'Đã thêm...', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
        .setDescription(`Đã thêm [${playlist.name}](${playlist.url}) (${playlist.songs.length} bài hát) vào danh sách phát`)
        .setThumbnail(playlist.thumbnail)
        .addField("🔷 | Trạng thái", `
        ┕${status(queue).toString()}`, false)
        .addField('⌛ | Thời gian', `
        ┕${playlist.formattedDuration}`, true)
        .addField("👌 | Yêu cầu bởi",`
        ┕${playlist.user}`, true)
    ]})
)

client.distube.on('playSong', (queue, song) =>
    queue.textChannel.send({embeds: [
        new MessageEmbed()
        .setColor('#ccff48')
        .setAuthor({name: 'Đang phát...', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
        .setDescription(`[${song.name}](${song.url})`)
        .setThumbnail(song.thumbnail)
        .setColor('#ccff48')
        .setAuthor({name: 'Đang phát...', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
        .setDescription(`[${song.name}](${song.url})`)
        .setThumbnail(song.thumbnail)
        .addField("🔷 | Trạng thái", `
        ┕${status(queue).toString()}`, false)
        .addField('🆙 | Đăng tải lên bởi', `
        ┕[${song.uploader.name}](${song.uploader.url})`, true)
        .addField('👀 | Lượt nghe', `
        ┕${Format.format(song.views)}`, true)
        .addField('👍 | Thích', `
        ┕${Format.format(song.likes)}`, true)
        .addField('⌛ | Thời gian', `
        ┕${song.formattedDuration}`, true)
        .addField('📩 | Link tải', `
        ┕[Click vào đây](${song.streamURL})`, true)
        .addField("👌 | Yêu cầu bởi",`
        ┕${song.user}`, true)
        .addField('📻 | Phát nhạc tại', `
        ┕🔊 | ${client.channels.cache.get(queue.voiceChannel.id)}
        ┕🪄 | ${queue.voiceChannel.bitrate / 1000}  kbps`, false)
        .addField("🤖 | Đề xuất",`[${song.related[0].name}](${song.related[0].url})
        ┕⌛ | Thời gian: ${song.related[0].formattedDuration} | 🆙 | Đăng tải lên bởi: [${song.related[0].uploader.name}](${song.related[0].uploader.url})`, false)
    ]})
  )
  .on('error', (channel, e) => {
    channel.send(`| An error encountered: ${e.toString().slice(0, 1974)}`)
    console.error(e)
  })
  .on('empty', channel => channel.send({embeds: [
      new MessageEmbed()
      .setColor('#ccff48')
      .setAuthor({name: 'Đã hết...', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
      .setDescription('Hết bài hát trong danh sách')
    ]}))
  .on('searchNoResult', (message, query) =>
    message.channel.send({embeds: [
        new MessageEmbed()
        .setColor('#ccff48')
        .setAuthor({name: 'Không tìm thấy...', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
        .setDescription(`Không tìm thấy bài hát nào với từ khóa \`${query}\``)
    ]})
  )
  .on('finish', queue => queue.textChannel.send({embeds: [
      new MessageEmbed()
      .setColor('#ccff48')
      .setAuthor({name: 'Đã hết...', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
      .setDescription('Hết bài hát trong danh sách')
    ]}))

