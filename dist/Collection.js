// .../dist/Collection.js
class Collection {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    remove(item) {
        this.items = this.items.filter((i) => i !== item);
    }
    get() {
        return this.items;
    }
}
exports.Collection = Collection;