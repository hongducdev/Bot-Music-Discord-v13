const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'serverlist',
    aliases: ['sl'],
    category: '🦉 - Owner',
    usage: 'd!serverlist',
    description: 'Hiển thị danh sách server của bot',

    run: async(client, message, args) => {
        if(message.author.id != '769244837030526976') {
            message.reply({embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setDescription('🚫 | Bạn không có quyền thực hiện hành động này!')
            ]})
        } else {
            const guilds = client.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .first(50)

            const description = guilds.map((guild, index) => {
                return `${index + 1}. ${guild.name} - ${guild.id} - ${guild.memberCount} thành viên`
            }).join('\n')

            const embed = new MessageEmbed()
            .setColor('#ccff48')
            .setTitle(`Danh sách server của bot(${client.guilds.cache.size} máy chủ)`)
            .setDescription(description)

            message.channel.send({ embeds: [embed]})
        }
    }
}