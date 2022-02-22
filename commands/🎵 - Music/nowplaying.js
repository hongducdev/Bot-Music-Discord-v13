const { MessageEmbed } = require('discord.js');
const Format = Intl.NumberFormat();
const status = queue =>
  `Âm lượng: \`${queue.volume}%\` | Bộ lọc: \`${queue.filters.join(', ') || 'Tắt'}\` | Lặp: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'Danh sách phát' : 'Bài hát') : 'Tắt'
  }\` | Autoplay: \`${queue.autoplay ? 'Bật' : 'Tắt'}\``

module.exports = {
    name: "nowplaying",
    aliases: ["np", "now"],
    category: "🎵 - Music",
    description: "Shows the current song playing",
    usage: "nowplaying",
    run: async (client, message, args) => {
        const queue = await client.distube.getQueue(message.guild.id);
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('RED')
            .setDescription(`🚫 | Bạn cần tham gia một kênh thoại để sử dụng tính năng này.`)
        ]});
        if(!queue) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('EF4F4F')
            .setAuthor({name: 'Lỗi', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('Không có bài hát nào đang phát!')
        ]})
        if(queue) {
            if(message.guild.me.voice.channelId !== message.member.voice.channelId) {
                return message.reply({embeds: [
                    new MessageEmbed()
                    .setColor('RED')
                    .setDescription(`🚫 | Bạn cần vào cùng một kênh thoại với bot!`)
                ]});
            }
        }
        
        const song = queue.songs[0];
        const embed = new MessageEmbed()
        .setColor('#ccff48')
        .setAuthor({name: 'Đang phát...', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
        .setDescription(`[${song.name}](${song.url})`)
        .setThumbnail(song.thumbnail)
        .addField("🔷 | Trạng thái", `${status(queue).toString()}`, false)
        .addField('👀 | Lượt nghe', `${Format.format(song.views)}`, true)
        .addField('👍 | Thích', `${Format.format(song.likes)}`, true)
        .addField('👎 | Không thích', `${Format.format(song.dislikes)}`, true)
        .addField('⌛ | Đã phát', `${queue.formattedCurrentTime} / ${song.formattedDuration}`, true)
        .addField('📩 | Link tải', `[Click vào đây](${song.streamURL})`, true)
        .addField("👌 | Yêu cầu bởi",` ${song.user}`, true)

        message.reply({embeds: [embed]});
    }
}
