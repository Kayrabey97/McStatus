const util = require('minecraft-server-util');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "mcstatus",
    description: "Minecraft sunucu durumunu gösterir",
    options: [],
    run: async (client, interaction, db) => {
        const serverIP = 'mc.hypixel.net'; // Hypixel Sunucu IP'si
        const serverPort = 25565;          // Minecraft default portu
        const thumbnailURL = "https://i.pinimg.com/564x/c4/32/1c/c4321c257323b2ca05111bea2021609f.jpg"; // Thumbnail URL'si, uygun resmi URL ile değiştirin

        try {
            // Sunucu durumunu al
            const response = await util.status(serverIP, serverPort, { timeout: 10000 });

            const embed = new EmbedBuilder()
                .setColor('#0099ff')  // Renk
                .setTitle('Hypixel Server Status')  // Başlık
                .setThumbnail(thumbnailURL) // Sağ üst köşede gösterilecek küçük resim
                .addFields(
                    { name: '🌍 IP', value: `\`\`\`${serverIP}\`\`\``, inline: true },    // IP ve emoji
                    { name: '🔢 Port', value: `\`\`\`${serverPort.toString()}\`\`\``, inline: true },    // Port ve emoji
                    { name: '🌟 Version', value: `\`\`\`${response.version.name}\`\`\``, inline: true },    // Version ve emoji
                    { name: '📶 Status', value: `\`\`\`Online\`\`\``, inline: true },   // Status ve emoji
                    { name: '👥 Players', value: `\`\`\`Online: ${response.players.online}/${response.players.max}\`\`\``, inline: true },  // Players ve emoji
                    { name: '📝 Description', value: `\`\`\`Hypixel Network - Best Minecraft Server\`\`\``, inline: false }  // Description ve emoji
                )
                .setFooter({ text: `Hypixel Server Status Bot` })  // Footer metni
                .setTimestamp();  // Zaman damgası

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            let errorMsg = '⚠️ Sunucuya erişim sağlanamadı';  // Hata mesajı ve emoji

            if (error.code === 'ENOTFOUND') {
                errorMsg = '❌ Sunucu bulunamadı. Lütfen IP adresini kontrol edin.';  // Hata mesajı ve emoji
            }

            const embed = new EmbedBuilder()
                .setColor('#ff0000')  // Renk
                .setTitle('Hypixel Server Status')  // Başlık
                .setDescription(`${errorMsg}`)
                .setThumbnail(thumbnailURL) // Sağ üst köşede gösterilecek küçük resim
                .setFooter({ text: `Hypixel Server Status Bot` })  // Footer metni
                .setTimestamp();  // Zaman damgası

            await interaction.reply({ embeds: [embed] });
        }
    }
};