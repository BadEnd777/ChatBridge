// .../buttons/Button.js
class Button {
    constructor(type) {
        this.type = type;
    }
    toJSON() {
        return {
            type: this.type
        };
    }
}
exports.Button = Button;