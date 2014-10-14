require(['src/inventory', 'src/item'], function (Inventory, Item) {
    describe('Inventory', function () {
        var inventory;

        beforeEach(function () {
            inventory = new Inventory();
        });

        it('holds no items by default', function () {
            expect(inventory.items()).toEqual([]);
        });

        it('can have items added', function () {
            var item = new Item(),
                item2 = new Item(),
                size = inventory.items().length,
                lastItem;

            inventory.add(item);
            lastItem = inventory.items()[inventory.items().length - 1];
            expect(inventory.items().length).toBe(size + 1);
            expect(lastItem).toEqual(item);

            inventory.add(item2);
            lastItem = inventory.items()[inventory.items().length - 1];
            expect(inventory.items().length).toBe(size + 2);
            expect(lastItem).toEqual(item2);
        });

        it('can have item selected', function () {
            var item = new Item(),
                item2 = new Item();

            inventory.add(item);
            inventory.add(item2);

            expect(inventory.selectedItem()).toBe(undefined);
            inventory.select(item2);
            expect(inventory.selectedItem()).toBe(item2);
            inventory.select(item);
            expect(inventory.selectedItem()).toBe(item);
        });

        it('can have item deselected', function () {
            var item = new Item();

            inventory.add(item);

            expect(inventory.selectedItem()).toBe(undefined);
            inventory.select(item);
            expect(inventory.selectedItem()).toBe(item);
            inventory.clearSelection();
            expect(inventory.selectedItem()).toBe(undefined);
        });
    });
});