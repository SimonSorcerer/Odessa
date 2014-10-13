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

        it('can have one of its items selected by id', function () {
            var id = 'random_id',
                item = new Item();
            spyOn(item, 'id').and.callFake(function () { return id; })

            inventory.add(item);
            inventory.selectById(id);

            expect(inventory.selectedItem()).toBe(item);
        });
    });
});