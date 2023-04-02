// .../templates/MediaTemplate.js
const Template_1 = require("./Template");
class MediaTemplate extends Template_1.Template {
    constructor() {
        super('media');
        this.elements = [];
    }
    addElements(elements) {
        this.elements.push(...elements);
        return this;
    }
    getElements() {
        return this.elements;
    }
    toJSON() {
        return {
            attachment: {
                type: 'template',
                payload: {
                    template_type: this.type,
                    elements: this.elements.map((element) => element.toJSON())
                }
            }
        };
    }
}
exports.MediaTemplate = MediaTemplate;