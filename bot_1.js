// Required Libraries 
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const { generateMeta } = require('./controllers/openaicontroller');

// Use this to interact with wpp account
const client = new Client();

// Generates QR-Code for authentication
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

// Listens for messages
client.on('message_create', async message => {
    contact_id = message.from;
    text_received = message.body.toLowerCase();
    response = ""
    
    if(text_received[0] === "#") {
        prompt = text_received.slice(1);
        response = await generateMeta(prompt);
        message.reply(response);
	}

    if(text_received === "ping") {
        message.reply("pong");
	}
});

client.initialize();
