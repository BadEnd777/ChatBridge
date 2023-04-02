// .../templates/ReceiptTemplate.js
const Template_1 = require("./Template");
class ReceiptTemplate extends Template_1.Template {
    constructor(recipientName, orderNumber, currency, paymentMethod) {
        super('receipt');
        this.recipient_name = recipientName;
        this.order_number = orderNumber;
        this.currency = currency;
        this.payment_method = paymentMethod;
        this.elements = [];
        this.adjustments = [];
    }
    setOrderUrl(orderUrl) {
        this.order_url = orderUrl;
        return this;
    }
    setTimestamp(timestamp) {
        this.timestamp = timestamp;
        return this;
    }
    setAddress(street1, street2, city, postalCode, state, country) {
        this.address = {
            street_1: street1,
            street_2: street2,
            city,
            postal_code: postalCode,
            state,
            country
        };
        return this;
    }
    setSummary(subtotal, shippingCost, totalTax, totalCost) {
        this.summary = {
            subtotal,
            shipping_cost: shippingCost,
            total_tax: totalTax,
            total_cost: totalCost
        };
        return this;
    }
    addAdjustments(adjustments) {
        this.adjustments.push(...adjustments);
        return this;
    }
    addElements(elements) {
        this.elements.push(...elements);
        return this;
    }
    toJSON() {
        return {
            attachment: {
                type: 'template',
                payload: {
                    template_type: this.type,
                    recipient_name: this.recipient_name,
                    order_number: this.order_number,
                    currency: this.currency,
                    payment_method: this.payment_method,
                    order_url: this.order_url,
                    timestamp: this.timestamp,
                    address: this.address,
                    summary: this.summary,
                    adjustments: this.adjustments.map((adjustment) => adjustment.toJSON()),
                    elements: this.elements.map((element) => element.toJSON())
                }
            }
        };
    }
}
exports.ReceiptTemplate = ReceiptTemplate;