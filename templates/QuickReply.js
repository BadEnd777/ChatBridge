// .../templates/QuickReply.js
class QuickReply {
    constructor(title) {
        this.title = title;
    }
    setPayload(payload) {
        this.payload = payload;
        return this;
    }
    setImageUrl(imageUrl) {
        this.image_url = imageUrl;
        return this;
    }
    toJSON() {
        return {
            content_type: 'text',
            title: this.title,
            payload: this.payload,
            image_url: this.image_url
        };
    }
}
exports.QuickReply = QuickReply;