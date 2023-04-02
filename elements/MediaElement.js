// .../elements/MediaElements.js
class MediaElement {
    constructor(mediaType, url) {
        this.media_type = mediaType;
        this.url = url;
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
            media_type: this.media_type,
            url: this.url,
            buttons: this.buttons.map((button) => button.toJSON())
        };
    }
}
exports.MediaElement = MediaElement;