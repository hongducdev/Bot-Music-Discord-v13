const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "shuffle",
    aliases: ["shuffle"],
    category: "🎵 - Music",
    description: "Shuffle the queue.",
    usage: "",
    run: async (client, message, args) => {
        const queue = await client.distube.getQueue(message.guild.id);
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('RED')
            .setDescription(`🚫 | Bạn cần tham gia một kênh thoại để sử dụng tính năng này.`)
        ]});
        if(!queue) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('EF4F4F')
            .setAuthor({name: 'Lỗi', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('Không có bài hát nào đang phát!')
        ]})
        if(queue) {
            if(message.guild.me.voice.channelId !== message.member.voice.channelId) {
                return message.reply({embeds: [
                    new MessageEmbed()
                    .setColor('RED')
                    .setDescription(`🚫 | Bạn cần vào cùng một kênh thoại với bot!`)
                ]});
            }
        }

        queue.shuffle();
        message.reply({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Đã làm ngẫu nhiên', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('Đã làm ngẫu nhiên danh sách bài hát!')
        ]})
    }
}
