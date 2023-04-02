// .../templates/ButtonTemplate.js
const Template_1 = require("./Template");
class ButtonTemplate extends Template_1.Template {
    constructor(text) {
        super('button');
        this.text = text;
        this.buttons = [];
    }
    addButtons(buttons) {
        this.buttons.push(...buttons);
        return this;
    }
    getButtons() {
        return this.buttons;
    }
    toJSON() {
        return {
            attachment: {
                type: 'template',
                payload: {
                    template_type: this.type,
                    text: this.text,
                    buttons: this.buttons.map((button) => button.toJSON())
                }
            }
        };
    }
}
exports.ButtonTemplate = ButtonTemplate;