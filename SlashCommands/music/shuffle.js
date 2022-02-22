const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'shuffle',
    description: 'Shuffle the queue.',
    usage: '',
    run: async (client, interaction, args) => {
        const queue = client.distube.getQueue(interaction);
        if(!queue) return interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('EF4F4F')
            .setAuthor({name: 'Lỗi', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('Không có bài hát nào đang phát!')
        ]})

        queue.shuffle();
        interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Đã làm ngẫu nhiên', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('Đã làm ngẫu nhiên danh sách bài hát!')
        ]})
    }
}