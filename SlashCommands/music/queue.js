const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    description: 'Hiển thị danh sách bài hát trong hàng đợi.',
    usage: 'queue',
    run: async(client, interaction, args) => {
        const queue = client.distube.getQueue(interaction);

        if(!queue) {
            return interaction.followUp({embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setDescription('Không có bài hát đang phát tại thời điểm này!')
            ]})
        }

        const q = queue.songs
        .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
        .join('\n')

        const tracks = queue.songs
        .map((song, i) => `**${i + 1}** - [${song.name}](${song.url}) | ${song.formattedDuration}
        Yêu cầu bởi : ${song.user}`)

        const songs = queue.songs.length;
        const nextSongs = songs > 10 ? `Và **${songs - 10}** bài hát khác...` : `Trong danh sách phát **${songs}** bài hát...`;

        interaction.followUp({embeds: [
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