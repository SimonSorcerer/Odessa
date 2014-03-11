define(['inventory', 'jasmine-html'], function(inventory) {
    describe('inventory', function () {
        it('holds a set of items', function () {
            var actual;

            actual = inventory.items;

            expect(typeof actual).toBe('object');
            expect(Object.prototype.toString.call(actual)).toBe('[object Array]');
        })

        it('can be added an item', function () {
            var actual, item;

            actual = inventory.items;
            expect(actual).toEqual([]);

            item = new Item();
            inventory.add(item);
            expect(actual).toBe([item]);
        })
    })
});