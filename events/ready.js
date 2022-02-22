const client = require("../index");

client.on("ready", () => {
    console.log("\x1b[34m%s\x1b[0m", `${client.user.tag} đã sẵn sàng hoạt động!`)
    const statuses = [ // status bot
        "với Pinkduwc._#0510",
        `🏓Ping: ${client.ws.ping}ms!`,
        `với ${client.guilds.cache.size} máy chủ`,
        `với ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} người dùng`,
        "Youtube",
        "d! / Slash command",
        "Spotify",
        "Soundcloud",
        "hongduccodedao.cf"
    ]
    let index = 0
    setInterval(() => {
        if (index === statuses.length) index = 0
        const status = statuses[index]
        client.user.setActivity(`${status}`, {
            type: "LISTENING",
            browser: "DISCORD IOS"
        })
        index++
    }, 10000)
})
