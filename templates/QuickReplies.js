// .../templates/QuickReplies.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickReply = exports.QuickReplies = void 0;
class QuickReplies {
    constructor(text) {
        this.text = text;
        this.quick_replies = [];
    }
    addQuickReply(quickReplies) {
        this.quick_replies.push(...quickReplies);
        return this;
    }
    toJSON() {
        return {
            text: this.text,
            quick_replies: this.quick_replies.map((quickReply) => quickReply.toJSON())
        };
    }
}
exports.QuickReplies = QuickReplies;