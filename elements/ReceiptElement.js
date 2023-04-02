// .../elements/ReceiptElement.js
class ReceiptElement {
    constructor(title, subtitle, quantity, price, currency, imageUrl) {
        this.title = title;
        this.subtitle = subtitle;
        this.quantity = quantity;
        this.price = price;
        this.currency = currency;
        this.image_url = imageUrl;
    }
    toJSON() {
        return {
            title: this.title,
            subtitle: this.subtitle,
            quantity: this.quantity,
            price: this.price,
            currency: this.currency,
            image_url: this.image_url
        };
    }
}
exports.ReceiptElement = ReceiptElement;