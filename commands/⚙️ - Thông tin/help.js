const { MessageEmbed } = require('discord.js');
const { stripIndent } = require('common-tags')

module.exports = {
    name: 'help',
    aliases: ['h'],
    category: '⚙️ - Thông tin',
    usage: 'd!help [tên lệnh]',
    description: 'Hưỡng dẫn sử dụng lệnh',

    async run (client, message, args) {
        if (!args[0]) return getAll(client, message);
        return getCMD(client, message, args[0]);
    },
};

function getAll (client, message) {
    const embed = new MessageEmbed()
    .setColor('#ccff48')
    .setTitle(`📫 | Danh sách lệnh của ${client.user.username}`)
    .setFooter(`Sử dụng d!help [tên lệnh] để biết thêm chi tiết!`)

    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `\`${cmd.name}\``)
            .join(' | ')
    }

    const info = client.categories
        .map(cat => stripIndent`**${cat[0].toUpperCase() + cat.slice(1)}**\n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);

    embed.setDescription(info);
    return message.channel.send({embeds: [embed]});
}

function getCMD(client, message, input) {
    const embed = new MessageEmbed()
    const cmd = client.commands.get(input.toLowerCase() || client.commands.get(client.aliases.get(input.toLowerCase())))

    if (cmd.name) info = `**Tên lệnh:** ${cmd.name}`
    if (cmd.aliases) info += `\n**Tên gọi khác:** ${cmd.aliases.map(a => `\`${a}\``).join(',')}`
    if (cmd.description) info += `\n**Chi tiết lệnh:** ${cmd.description}`
    if (cmd.usage) {
        info += `\n**Cách sử dụng lệnh:** ${cmd.usage}`;
        embed.setFooter("Cú pháp <> = bắt buộc, [] = không bắt buộc")
    }
    return message.channel.send({embeds: [embed.setColor('GREEN').setDescription(info)]})
}
