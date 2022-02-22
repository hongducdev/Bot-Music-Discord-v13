const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'pause',
    description: 'Tạm dừng bài hát hiện tại!',
    usage: 'pause',
    run: async(client, interaction, args) => {
        const queue = client.distube.getQueue(interaction);

        if(!queue) {
            interaction.followUp({embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setDescription('Không có bài hát đang phát tại thời điểm này!')
            ]})
        }

        queue.pause();
        interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Tạm dừng', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('Đã tạm dừng bài hát!')
        ]})
    }
}