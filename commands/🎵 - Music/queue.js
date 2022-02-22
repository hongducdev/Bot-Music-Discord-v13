const { MessageEmbed, MessageButton } = require('discord.js');

module.exports = {
    name: 'queue',
    description: 'Hiển thị danh sách phát',
    category: '🎵 - Music',
    aliases: ['q'],
    usage: 'queue',
    cooldown: 5,
    run: async (client, message, args, _fromButton = false) => {
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

        const q = queue.songs
        .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
        .join('\n')

        const tracks = queue.songs
        .map((song, i) => `**${i + 1}** - [${song.name}](${song.url}) | ${song.formattedDuration}
        Yêu cầu bởi : ${song.user}`)

        const songs = queue.songs.length;
        const nextSongs = songs > 10 ? `Và **${songs - 10}** bài hát khác...` : `Trong danh sách phát **${songs}** bài hát...`;

        message.reply({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Danh sách phát', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription(`${tracks.slice(0, 10).join('\n')}\n\n${nextSongs}`)
            .addField(`Đang phát:`, `[${queue.songs[0].name}](${queue.songs[0].url}) - ${queue.songs[0].formattedDuration} | Yêu cầu bởi: ${queue.songs[0].user}`, false)
            .addField(`Tổng thời gian phát:`, `${queue.formattedDuration}`, true)
            .addField(`Tổng số bài hát:`, `${songs}`, true)
        ]})
    }
}
