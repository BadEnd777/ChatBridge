// .../buttons/CallButton.js
const Button_1 = require("./Button");
class CallButton extends Button_1.Button {
    constructor(title, phoneNumber) {
        super('phone_number');
        this.title = title;
        this.phoneNumber = phoneNumber;
    }
    toJSON() {
        return Object.assign({}, super.toJSON(), { title: this.title, payload: this.phoneNumber });
    }
}
exports.CallButton = CallButton;