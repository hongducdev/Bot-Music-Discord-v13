const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'skip',
    description: 'Skip the current song',
    usage: 'skip',

    run: async(client, interaction, args) => {
        const queue = client.distube.getQueue(interaction);
        if(!queue) {
            return interaction.reply({embeds: [
                new MessageEmbed()
                .setColor('EF4F4F')
                .setAuthor({name: 'Lỗi', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
                .setDescription('Không có bài hát nào đang phát!')
            ]})
        }

        queue.skip();
        interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Bỏ qua bài hát', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('Đã bỏ qua bài hát!')
        ]})
    }
}
