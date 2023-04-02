// .../templates/FeedbackFollowUp.js
class FeedbackFollowUp {
    constructor(type, placeholder) {
        this.type = type;
        this.placeholder = placeholder;
    }
    toJSON() {
        return {
            type: this.type,
            placeholder: this.placeholder
        };
    }
}
exports.FeedbackFollowUp = FeedbackFollowUp;