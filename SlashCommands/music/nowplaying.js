const { MessageEmbed } = require('discord.js');
const Format = Intl.NumberFormat();
const status = queue =>
`Âm lượng: \`${queue.volume}%\` | Bộ lọc: \`${queue.filters.join(', ') || 'Tắt'}\` | Lặp: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'Danh sách phát' : 'Bài hát') : 'Tắt'
  }\` | Autoplay: \`${queue.autoplay ? 'Bật' : 'Tắt'}\``

module.exports = {
    name: "nowplaying",
    description: "Shows the current song playing",
    usage: "nowplaying",
    run: async (client, interaction, args) => {
        const queue = client.distube.getQueue(interaction);

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

        interaction.followUp({embeds: [embed]});
    }
}
