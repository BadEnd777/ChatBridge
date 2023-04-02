// .../templates/FeedbackTemplate.js
const Template_1 = require("./Template");
class FeedbackTemplate extends Template_1.Template {
    constructor() {
        super('customer_feedback');
        this.feedback_screens = [];
    }
    setTitle(title) {
        this.title = title;
        return this;
    }
    setSubtitle(subtitle) {
        this.subtitle = subtitle;
        return this;
    }
    setButtonTitle(button_title) {
        this.button_title = button_title;
        return this;
    }
    setExpiresInDays(expires_in_days) {
        this.expires_in_days = expires_in_days;
        return this;
    }
    setBusinessPrivacyUrl(url) {
        this.business_privacy = { url };
        return this;
    }
    addFeedbackScreens(screens) {
        this.feedback_screens.push(...screens);
        return this;
    }
    getFeedbackScreens() {
        return this.feedback_screens;
    }
    toJSON() {
        return {
            attachment: {
                type: 'template',
                payload: {
                    template_type: this.type,
                    title: this.title,
                    subtitle: this.subtitle,
                    button_title: this.button_title,
                    feedback_screens: this.feedback_screens.map((screen) => screen.toJSON()),
                    business_privacy: this.business_privacy,
                    expires_in_days: this.expires_in_days
                }
            }
        };
    }
}
exports.FeedbackTemplate = FeedbackTemplate;