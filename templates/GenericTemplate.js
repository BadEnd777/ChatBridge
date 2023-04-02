// .../templates/GenericTemplate.js
const Template_1 = require("./Template");
class GenericTemplate extends Template_1.Template {
    constructor() {
        super('generic');
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
exports.GenericTemplate = GenericTemplate;