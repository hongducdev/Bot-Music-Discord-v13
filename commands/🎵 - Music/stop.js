const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'stop',
    description: 'Stop the current song and leave the voice channel.',
    aliases: ['leave', 'disconnect', 'dc'],
    category: '🎵 - Music',
    usage: '',
    cooldown: 0,
    run: async (client, message, args) => {
        const queue = await client.distube.getQueue(message.guild.id);
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('RED')
            .setDescription(`🚫 | Bạn cần tham gia một kênh thoại để sử dụng tính năng này.`)
        ]});
        if(queue) {
            if(message.guild.me.voice.channelId !== message.member.voice.channelId) {
                return message.reply({embeds: [
                    new MessageEmbed()
                    .setColor('RED')
                    .setDescription(`🚫 | Bạn cần vào cùng một kênh thoại với bot!`)
                ]});
            }
        }
        
        queue.stop();
        client.distube.voices.leave(message);
        message.channel.send({embeds: [
            new MessageEmbed()
            .setColor('EF4F4F')
            .setAuthor({name: 'Ngắt kết nối', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('Đã ngắt kết nối với kênh thoại!')
        ]});
    }
}
