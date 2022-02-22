const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'seek',
    description: 'Tua bài hát hiện tại đến vị trí đã chỉ định!',
    usage: 'seek <time>',
    options: [
        {
            name: 'thời_gian',
            description: 'Thời gian tua bài hát đến (ms)',
            type: 'NUMBER',
            required: false,
        }
    ],
    run: async(client, interaction, args) => {
        const time = interaction.options.getNumber('thời_gian');
        const queue = client.distube.getQueue(interaction);
        if(!queue) return interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('EF4F4F')
            .setAuthor({name: 'Lỗi', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('Không có bài hát nào đang phát!')
        ]})

        if(!time) return interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('EF4F4F')
            .setAuthor({name: 'Lỗi', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription(`Bạn phải chọn 1 mốc thời gian để tua! ( < ${queue.songs[0].duration}ms )`)
        ]})

        if(time > queue.songs[0].formattedDuration) return interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('EF4F4F')
            .setAuthor({name: 'Lỗi', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('Thời gian tua không thể lớn hơn thời gian bài hát!')
        ]})

        queue.seek(time);
        interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Tua', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription(`Đã tua đến **${time}ms / ${queue.songs[0].duration}ms**`)
        ]})
    }
}