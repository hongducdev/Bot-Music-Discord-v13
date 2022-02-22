const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'restart',
    description: 'Restarts the bot',
    category: '🦉 - Owner',
    usage: 'restart',
    aliases: ['rb'],

    run: async (client, message, args) => {
        if(message.author.id != '769244837030526976') {
            return message.reply({embeds: [
                new MessageEmbed()
                .setColor('#ff0000')
                .setDescription('Bạn không quyền thực hiện lệnh này!')
            ]})
        } else {
            const embed = new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Khởi động lại...', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription(` \`\`\`md\n#Đang khởi động lại ${client.user.tag}...\nQuá trình này sẽ mất khoảng 1 phút\`\`\``)
            message.reply({embeds: [embed]})
            try {
                process.exit()
            } catch (e) {
                console.log(e)
                message.reply({embeds: [
                    new MessageEmbed()
                    .setColor('#ff0000')
                    .setDescription(`Đã xảy ra lỗi ${e}!`)
                ]})
            }
        }
    }
}