const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'resume',
    description: 'Phát tiếp bài hát hiện tại đã tạm dừng!',
    usage: 'resume',
    run: async(client, interaction, args) => {
        const queue = client.distube.getQueue(interaction);

        if(!queue) {
            interaction.followUp({embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setDescription('Không có bài hát đang phát tại thời điểm này!')
            ]})
        }

        queue.resume();
        interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Tiếp tục', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('Đã tiếp tục bài hát!')
        ]})
    }
}