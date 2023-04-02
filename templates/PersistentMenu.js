// .../menus/PersistentMenu.js
class PersistentMenu {
    constructor(psid) {
        this.psid = psid;
        this.menu = [];
    }
    addMenuItem(title, payload, webviewHeightRatio) {
        const callToAction = {
            title,
            type: 'postback',
            payload
        };
        if (webviewHeightRatio) {
            callToAction.type = 'web_url';
            callToAction.webview_height_ratio = webviewHeightRatio;
        }
        this.menu.push(callToAction);
        return this;
    }
    toJSON() {
        return {
            psid: this.psid,
            persistent_menu: [
                {
                    locale: 'default',
                    composer_input_disabled: false,
                    call_to_actions: this.menu
                }
            ]
        };
    }
}
exports.PersistentMenu = PersistentMenu;