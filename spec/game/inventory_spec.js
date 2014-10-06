require(['inventory', 'item'], function (Inventory, Item) {
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
                item2 = new Item();

            inventory.add(item);
            expect(inventory.items()).toEqual([item]);

            inventory.add(item2);
            expect(inventory.items()).toEqual([item, item2]);
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