// .../elements/GenericElement.js
class GenericElement {
    constructor(title) {
        this.title = title;
        this.buttons = [];
    }
    setImageUrl(url) {
        this.image_url = url;
        return this;
    }
    setSubtitle(subtitle) {
        this.subtitle = subtitle;
        return this;
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
            title: this.title,
            image_url: this.image_url,
            subtitle: this.subtitle,
            buttons: this.buttons.map((button) => button.toJSON())
        };
    }
}
exports.GenericElement = GenericElement;