// .../dist/Collection.js
class Collection {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    get(name) {
        return this.items.find(item => item.name === name);
    }
}
exports.Collection = Collection;