// .../templates/Adjustment.js
class Adjustment {
    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
    }
    toJSON() {
        return {
            name: this.name,
            amount: this.amount
        };
    }
}
exports.Adjustment = Adjustment;