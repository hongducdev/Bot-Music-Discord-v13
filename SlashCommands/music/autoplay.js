const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'autoplay',
    description: 'Toggles autoplay for the current guild.',
    usage: 'autoplay',
    run: async(client, interaction,args) => {
        const queue = client.distube.getQueue(interaction);
        if(!queue) {
            return interaction.followUp({embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setDescription('Không có bài hát đang phát tại thời điểm này!')
            ]})
        }
        const autoplay = queue.toggleAutoplay();
        interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Tự động chơi bài hát', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription(`Tự động chơi bài hát: ${autoplay ? '**Bật**' : '**Tắt**'}`)
        ]})
    }
}