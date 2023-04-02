// .../templates/CouponTemplate.js
const Template_1 = require("./Template");
class CouponTemplate extends Template_1.Template {
    constructor() {
        super('coupon');
    }
    setTitle(title) {
        this.title = title;
        return this;
    }
    setSubtitle(subtitle) {
        this.subtitle = subtitle;
        return this;
    }
    setCouponCode(couponCode) {
        this.coupon_code = couponCode;
        return this;
    }
    setCouponUrl(couponUrl) {
        this.coupon_url = couponUrl;
        return this;
    }
    setCouponUrlButtonTitle(couponUrlButtonTitle) {
        this.coupon_url_button_title = couponUrlButtonTitle;
        return this;
    }
    setCouponPreMessage(couponPreMessage) {
        this.coupon_pre_message = couponPreMessage;
        return this;
    }
    setImageUrl(imageUrl) {
        this.image_url = imageUrl;
        return this;
    }
    setPayload(payload) {
        this.payload = payload;
        return this;
    }
    toJSON() {
        return {
            attachment: {
                type: 'template',
                payload: {
                    template_type: this.type,
                    title: this.title,
                    subtitle: this.subtitle,
                    coupon_code: this.coupon_code,
                    coupon_url: this.coupon_url,
                    coupon_url_button_title: this.coupon_url_button_title,
                    coupon_pre_message: this.coupon_pre_message,
                    image_url: this.image_url,
                    payload: this.payload,
                },
            },
        };
    }
}
exports.CouponTemplate = CouponTemplate;