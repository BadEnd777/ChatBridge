// .../buttons/PostbackButton.js
const Button_1 = require("./Button");
class PostbackButton extends Button_1.Button {
    constructor(title, payload) {
        super('postback');
        this.title = title;
        this.payload = payload;
    }
    toJSON() {
        return Object.assign({}, super.toJSON(), { title: this.title, payload: this.payload });
    }
}
exports.PostbackButton = PostbackButton;