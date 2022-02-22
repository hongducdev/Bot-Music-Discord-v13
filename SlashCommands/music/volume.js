const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'volume',
    description: 'Changes the volume of the current song.',
    usage: '<volume>',
    options: [
        {
            name: 'âm_lượng',
            description: 'The volume to set the music to.',
            type: 'NUMBER',
            required: true
        }
    ],
    run: async (client, interaction, args) => {
        const volume = interaction.options.getNumber('âm_lượng');
        const queue = client.distube.getQueue(interaction);
        if(!queue) return interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('EF4F4F')
            .setAuthor({name: 'Lỗi', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('Không có bài hát nào đang phát!')
        ]})

        queue.setVolume(volume);
        interaction.followUp({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Thay đổi âm lượng', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription(`Đã thay đổi âm lượng thành **${volume}%**`)
        ]})
    }
}