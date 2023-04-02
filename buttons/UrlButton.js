// .../buttons\UrlButton.js
const Button_1 = require("./Button");
class UrlButton extends Button_1.Button {
    constructor(title, url) {
        super('web_url');
        this.title = title;
        this.url = url;
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { title: this.title, url: this.url });
    }
}
exports.UrlButton = UrlButton;