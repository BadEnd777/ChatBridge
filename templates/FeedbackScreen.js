// .../templates/FeedbackScreen.js
class FeedbackScreen {
    constructor() {
        this.questions = [];
    }
    addQuestions(questions) {
        this.questions.push(...questions);
        return this;
    }
    toJSON() {
        return {
            questions: this.questions.map((question) => question.toJSON())
        };
    }
}
exports.FeedbackScreen = FeedbackScreen;