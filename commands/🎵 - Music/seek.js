const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "seek",
    aliases: ["seek"],
    category: "🎵 - Music",
    description: "Seek to a specific time in the current song.",
    usage: "<time>",
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
        
        if(!args[0]) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('EF4F4F')
            .setAuthor({name: 'Lỗi', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('Bạn phải chọn 1 mốc thời gian để tua!')
        ]})

        const time = Number(args.join(' '));
        console.log(time)
        console.log(queue.songs[0].formattedDuration)
        console.log(queue.songs[0].duration)
        if(time > queue.songs[0].formattedDuration) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('EF4F4F')
            .setAuthor({name: 'Lỗi', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('Thời gian tua không thể lớn hơn thời gian bài hát!')
        ]})

        queue.seek(time);
        message.reply({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Tua', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription(`Đã tua đến **${time}ms / ${queue.songs[0].duration}ms**`)
        ]})
    }
}