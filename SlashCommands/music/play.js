// const player = require('../../client/player.js');

module.exports = {
    name: 'play',
    description: 'Play a song from YouTube, SoundCloud, Spotify, Mixer, Twitch, Bandcamp, or a direct link.',
    aliases: ['p'],
    usage: '<song name>',
    category: '🎵 - Music',
    options: [
        {
            name: 'tên_bài_hát_url',
            description: 'Tên bài hát hoặc url',
            type: 'STRING',
            required: true
        }
    ],
    run: async (client, interaction, args) => {
        const string = interaction.options.getString('tên_bài_hát_url')

        const voiceChannel = interaction.member.voice.channel
        const queue = await client.distube.getQueue(interaction)

        // await interaction.reply("🔍 **Searching and attempting...**")
        await interaction.followUp("Đã tìm kiếm thành công...👌")
        client.distube.play(voiceChannel, string, {
            textChannel: interaction.channel,
            member: interaction.member
        })
    }
}