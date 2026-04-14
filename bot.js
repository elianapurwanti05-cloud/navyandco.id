const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");
const qrcode = require("qrcode-terminal");

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("auth");

    const sock = makeWASocket({
        auth: state
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", (update) => {
        const { connection, qr } = update;

        if (qr) {
            console.log("Scan QR ini:");
            qrcode.generate(qr, { small: true });
        }

        if (connection === "open") {
            console.log("Bot berhasil login ✅");
        }

        if (connection === "close") {
            console.log("Koneksi tertutup ❌");
        }
    });

    sock.ev.on("messages.upsert", async (m) => {
        const msg = m.messages[0];
        if (!msg.message) return;

        const sender = msg.key.remoteJid;
        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text;

        if (!text) return;

        if (text.toLowerCase() === "halo") {
            await sock.sendMessage(sender, { text: "Halo juga! 🤖 Bot aktif." });
        }
    });
}

startBot();