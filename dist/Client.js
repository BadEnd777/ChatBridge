// .../dist/Client.js
const { request } = require("undici");
const fastify = require("fastify");
const constants = require("./Constants");
class Client {
    constructor({ accessToken, verifyToken, webHookPath, port, host }) {
        this.events = {};
        this.app = fastify();
        this.accessToken = accessToken;
        this.verifyToken = verifyToken;
        this.webHookPath = webHookPath || "/webhook";
        this.port = port || 3000;
        this.host = host || "localhost";
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
        this.app.post(this.webHookPath, async (request, reply) => {
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
        this.app.get(this.webHookPath, (request, reply) => {
            if (request.query["hub.mode"] === "subscribe" && request.query["hub.verify_token"] === this.verifyToken) {
                reply.send(request.query["hub.challenge"]);
            } else {
                reply.send("Error, wrong validation token");
            }
        });
        this.app.listen({ port: this.port, host: this.host }, (err, address) => {
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
        const response = await request(url);
        const { statusCode } = response;
        const body = await response.body.json();
        if (statusCode !== 200) {
            throw new Error(
                `[ChatBridge] ${body.error.message} (code: ${body.error.code}, type: ${body.error.type})`
            );
        }
        return body;
    }
    async sendRequest(method, path, data) {
        const url = `${constants.MESSAGES_URL}${path}?access_token=${this.accessToken}`;
        const body = JSON.stringify(data);
        const headers = {
            "Content-Type": "application/json",
        };
        const response = await request(url, {
            method,
            body,
            headers,
        });
        const { statusCode } = response;
        const bodyData = await response.body.json();
        if (statusCode !== 200) {
            throw new Error(
                `[ChatBridge] ${bodyData.error.message} (code: ${bodyData.error.code}, type: ${bodyData.error.type})`
            );
        }
        return bodyData;
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