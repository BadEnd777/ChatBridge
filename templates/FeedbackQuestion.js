// .../templates/FeedbackQuestion.js
class FeedbackQuestion {
    constructor() {}
    setQuestionId(id) {
        this.id = id;
        return this;
    }
    setQuestionType(type) {
        this.type = type;
        return this;
    }
    setQuestionText(text) {
        this.title = text;
        return this;
    }
    setFollowUp(follow_up) {
        this.follow_up = follow_up;
        return this;
    }
    toJSON() {
        return {
            id: this.id,
            type: this.type,
            title: this.title,
            follow_up: this.follow_up
        };
    }
}
exports.FeedbackQuestion = FeedbackQuestion;