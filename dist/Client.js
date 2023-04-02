// .../dist/Client.js
const fastify = require("fastify");
const axios = require("axios");
const constants = require("./Constants");
class Client {
    constructor(options) {
        this.events = {};
        this.app = fastify();
        this.accessToken = options.accessToken;
        this.verifyToken = options.verifyToken;
        this.port = options.port || 3000;
    }
    on(event, callback) {
        this.events[event] = callback;
    }
    emit(event, data) {
        if (this.events[event]) {
            this.events[event](data, this);
        }
    }
    start(callback) {
        this.app.post("/webhook", async (request, reply) => {
            const body = request.body;
            if (body.object === "page") {
                body.entry.forEach((entry) => {
                    const webhookEvent = entry.messaging[0];
                    const eventType = webhookEvent.message
                        && webhookEvent.message.quick_reply
                        ? "quick_reply"
                        : webhookEvent.message
                            ? "message"
                            : webhookEvent.postback
                                ? "postback"
                                : webhookEvent.template
                                    ? "template"
                                    : "unknown";
                    this.emit(eventType, webhookEvent);
                });
            }
            reply.send();
        });
        this.app.get("/webhook", async (request, reply) => {
            if (request.query["hub.mode"] === "subscribe" && request.query["hub.verify_token"] === this.verifyToken) {
                reply.send(request.query["hub.challenge"]);
            } else {
                reply.send("Error, wrong validation token");
            }
        });
        this.app.listen({ port: this.port }, (err, address) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            console.log(`Server listening at ${address}`);
            if (callback) {
                callback();
            }
        });
    }
    async getUserInfo(userId) {
        const url = `${constants.BASE_URL}${userId}?fields=first_name,last_name,profile_pic&access_token=${this.accessToken}`;
        const response = await axios({
            method: "GET",
            url,
        });
        return response.data;   
    }
    async sendRequest(method, path, data) {
        const url = `${constants.MESSAGES_URL}${path}?access_token=${this.accessToken}`;
        const response = await axios({
            method,
            url,
            data,
        });
        return response.data;
    }
    async setGreetings(greetings) {
        return this.sendRequest("POST", "messenger_profile", {
            greeting: [
                {
                    locale: "default",
                    text: greetings,
                },
            ]
        });
    }
    async setGetStarted(payload) {
        return this.sendRequest("POST", "messenger_profile", {
            get_started: {
                payload,
            },
        });
    }
    async setPersistentMenu(array) {
        return this.sendRequest("POST", "messenger_profile", array);
    }
    async getPageInfo() {
        return this.sendRequest("GET", "");
    }
    async sendApi(recipientId, data) {
        return this.sendRequest("POST", "messages", {
            recipient: {
                id: recipientId,
            },
            message: data,
        });
    }
    async sendAction(recipientId, action) {
        return this.sendRequest("POST", "messages", {
            recipient: {
                id: recipientId,
            },
            sender_action: action,
        });
    }
    async sendTypingOn(recipientId) {
        return this.sendAction(recipientId, "typing_on");
    }
    async sendTypingOff(recipientId) {
        return this.sendAction(recipientId, "typing_off");
    }
    async sendMarkSeen(recipientId) {
        return this.sendAction(recipientId, "mark_seen");
    }
    async sendTextMessage(recipientId, text) {
        return this.sendApi(recipientId, {
            text,
        });
    }
    async sendAttachmentMessage(recipientId, type, url) {
        return this.sendApi(recipientId, {
            attachment: {
                type,
                payload: {
                    url,
                },
            },
        });
    }
    async sendImageMessage(recipientId, url) {
        return this.sendAttachmentMessage(recipientId, "image", url);
    }
    async sendAudioMessage(recipientId, url) {
        return this.sendAttachmentMessage(recipientId, "audio", url);
    }
    async sendVideoMessage(recipientId, url) {
        return this.sendAttachmentMessage(recipientId, "video", url);
    }
    async sendFileMessage(recipientId, url) {
        return this.sendAttachmentMessage(recipientId, "file", url);
    }
}
exports.Client = Client;