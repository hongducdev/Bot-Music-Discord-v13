const { MessageEmbed } = require('discord.js');
const { inspect } = require('util');

module.exports = {
    name: "eval",
    aliases: ["ev", "e"],
    category: "🦉 - Owner",
    description: "Thực hiện một đoạn code của bạn",
    usage: "eval <code>",
    run: async (client, message, args) => {
        if(message.author.id != '769244837030526976') {
            return message.reply({embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setDescription('🚫 | Chỉ có PinkDuwc._#0510 có quyền chạy lệnh này thôi!')
            ]})
        };

        const code = args.join(" ");
        const start = process.hrtime();
        const difference = process.hrtime(start);
        if(!code) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('RED')
            .setDescription('🚫 | Bạn chưa nhập code!')
        ]});

        if (message.author.id == '769244837030526976') {
            try {
                const result = await eval(code);
                let output = result;
//                 if(typeof result !== "string") {
//                     output = inspect(result);
//                 }

                const embed = new MessageEmbed()
                .setColor('#ccff48')
                .setAuthor({name: '🦉 - Eval', iconURL: message.author.avatarURL()})
                .addField('**Input**', `\`\`\`js\n${code}\`\`\``, false)
                .addField('**Output**', `\`\`\`js\n${output}\`\`\``, false)
                .addField('**Kiểu dữ liệu**', `\`\`\`js\n${typeof result}\`\`\``, false)
                .addField('**Lệnh được thực thi trong**', `\`\`\`diff\n${difference[0] > 0 ? `${difference[0]}s ` : ""}${difference[1] / 1e6}ms\`\`\``, false)

                message.reply({embeds: [embed]})
            } catch (e) {
                console.log(e);
                return message.reply({embeds: [
                    new MessageEmbed()
                    .setColor('RED')
                    .setDescription('Lỗi: ' + e)
                ]})
            }
        }
    }
}
