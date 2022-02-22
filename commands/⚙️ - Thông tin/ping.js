const { MessageEmbed, Client, version } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: [' '],
    category: '⚙️ - Thông tin',
    description: 'Ping bot',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const statsembed = new MessageEmbed()
    .addFields(
        {
          name: ":robot: Client",
          value: `┕🟢 Online! <t:${parseInt(client.readyTimestamp /1000)}:R>`,
          inline: true,
        },
        {
          name: "⌛ Ping",
          value: `┕${Math.round(message.client.ws.ping)}ms`,
          inline: true,
        },
       {
            name: ":file_cabinet: Memory",
            value: `┕${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
              2
            )}mb`,
            inline: true,
          },
          {
            name: ":robot: Version",
            value: `┕v${require("../../package.json").version}`,
            inline: true,
          },
          {
            name: ":blue_book: Discord.js",
            value: `┕v${version}`,
            inline: true,
          },
          {
            name: ":green_book: Node",
            value: `┕${process.version}`,
            inline: true,
          },
      )
      .setColor('#ccff48')
  
      message.reply({ embeds: [statsembed]});
    },
};
