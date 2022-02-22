const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'loop',
    description: 'Loop the current song.',
    usage: 'loop',
    options: [
        {
            name: 'chế_độ',
            description: 'Chế độ lặp lại',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'Tắt',
                    value: 'off'
                }, 
                {
                    name: 'Bài_hát',
                    value: 'song'
                },
                {
                    name: 'Danh_sách',
                    value: 'queue'
                }
            ]
        }
    ],

    run: async(client, interaction, args) => {
        const loop = interaction.options.getString('chế_độ');
        const queue = client.distube.getQueue(interaction);

        if(!queue) {
            return interaction.followUp({embeds: [
                new MessageEmbed()
                .setColor('EF4F4F')
                .setAuthor({name: 'Lỗi', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
                .setDescription('Không có bài hát nào đang phát!')
            ]})
        }

        if(loop == 'off') {
            queue.setRepeatMode(0);
            interaction.followUp({embeds: [
                new MessageEmbed()
                .setColor('#ccff48')
                .setAuthor({name: 'Tắt lặp lại', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
                .setDescription('Đã tắt lặp lại!')
            ]})
        } else if(loop == 'song') {
            queue.setRepeatMode(1);
            interaction.followUp({embeds: [
                new MessageEmbed()
                .setColor('#ccff48')
                .setAuthor({name: 'Lặp lại bài hát', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
                .setDescription('Đã lặp lại bài hát hiện tại!')
            ]})
        } else if (loop == 'queue') {
            queue.setRepeatMode(2);
            interaction.followUp({embeds: [
                new MessageEmbed()
                .setColor('#ccff48')
                .setAuthor({name: 'Lặp lại bài hát', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
                .setDescription('Đã lặp lại danh sách nhạc!')
            ]})
        }
    }
}
