const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "loop",
    aliases: ["repeat"],
    category: "🎵 - Music",
    description: "Loop the current song.",
    usage: "loop",

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

        let mode = null;
        if(!args[0]) {
            mode = 0;
            message.reply({embeds: [
                new MessageEmbed()
                .setColor('EF4F4F') 
                .setAuthor({name: 'Lỗi', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
                .setDescription('Bạn phải chọn 1 lựa chọn!')
                .addField('off', 'Ngừng lặp bài hát.', true)
                .addField('song', 'Lặp lại bài hát hiện tại.', true)
                .addField('queue', 'Lặp lại tất cả bài hát trong hàng đợi.', true)
            ]})
        }

        switch (args[0]) {
        case 'off':
            mode = 0
            break
        case 'song':
            mode = 1
            break
        case 'queue':
            mode = 2
            break
        }
        mode = queue.setRepeatMode(mode)
        mode = mode ? (mode === 2 ? 'Lặp lại danh sách phát' : 'Lặp lại bài hát') : 'Tắt'
        message.reply({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Lặp lại', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription(`Đã chỉnh chế độ lặp thành **${mode}**!`)
        ]})
    }
}
