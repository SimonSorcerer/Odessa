require(['src/item'], function (Item) {
    'use strict';

    describe('item', function () {
        var item,
            id = 'rubber_chicken';

        beforeEach(function () {
            item = new Item(id);
        });

        it('has mandatory identifier', function () {
            expect(item.id()).toBeDefined();
            expect(item.id()).toBe(id);
        });

        it('cannot change its identifier', function () {
            var different_id = 'roasted_chicken';

            item.id(different_id);
            expect(item.id()).toBe(id);
        });

        it('has name equal to identifier by default', function () {
            expect(item.name()).toBe(item.id());
        });

        it('can have name changed', function () {
            var name = 'Rubber chicken';

            item.name(name);
            expect(item.name()).toBe(name);
        });

        it('has empty description by default', function () {
            expect(item.description()).toBe('');
        });

        it('can have description changed', function () {
            var description = 'Rubber chicken with a pulley in the middle.';

            item.description(description);
            expect(item.description()).toBe(description);
        });

        it('is obtainable by default', function () {
            expect(item.obtainable()).toBe(true);
        });

        it('can be set to non-obtainable', function () {
            item.obtainable(false);
            expect(item.obtainable()).toBe(false);
        });

        it('has empty states by default', function () {
            expect(item.states()).toEqual([]);
        });

        it('can chain its attribute setters', function () {
            var name = 'Rubber chicken',
                description = 'Rubber chicken with a pulley in the middle',
                obtainable = false;

            item.name(name).description(description).obtainable(obtainable);
            expect(item.name()).toBe(name);
            expect(item.description()).toBe(description);
            expect(item.obtainable()).toBe(obtainable);
        });

        it('can be taken if obtainable', function () {
            var callback = {
                success: function () {},
                fail: function () {}
            };
            spyOn(callback, 'success');
            spyOn(callback, 'fail');

            item.obtainable(true);
            item.take(callback);

            expect(callback.success).toHaveBeenCalled();
            expect(callback.fail).not.toHaveBeenCalled();
        });

        it('can be set by provided Json data', function () {
            var jsonData = { "id": "cat", "name": "Rosa the cat", "obtainable": false, states: [{ id: "cat_2", name: "Rosa the hungry cat" }] },
                item;

            item = new Item(jsonData.id).fromJson(jsonData);

            expect(item.id()).toBe('cat');
            expect(item.name()).toBe('Rosa the cat');
            expect(item.description()).toBe('');
            expect(item.obtainable()).toBe(false);
            expect(item.states().length).toBe(1);
            expect(item.states()[0].id).toBe('cat_2');
            expect(item.states()[0].name).toBe('Rosa the hungry cat');
        });

        it('can be switched to a different state', function () {
            var jsonData = { "id": "cat", "name": "Rosa the cat", "obtainable": false, states: [{ id: "cat_2", name: "Rosa the hungry cat", description: 'Rosa looks hungry.' }] },
                item;

            item = new Item(jsonData.id).fromJson(jsonData);

            expect(item.name()).toBe('Rosa the cat');
            expect(item.obtainable()).toBe(false);
            expect(item.description()).toBe('');

            item.switchToState(2);
            expect(item.name()).toBe('Rosa the hungry cat');
            expect(item.obtainable()).toBe(false);
            expect(item.description()).toBe('Rosa looks hungry.');
        });

        it('will not be switched to non-defined state', function () {
            var jsonData = { "id": "cat", "name": "Rosa the cat", "obtainable": false, states: [] },
                item;

            item = new Item(jsonData.id).fromJson(jsonData);

            expect(item.name()).toBe('Rosa the cat');
            expect(item.obtainable()).toBe(false);
            expect(item.description()).toBe('');

            item.switchToState(2);
            expect(item.name()).toBe('Rosa the cat');
            expect(item.obtainable()).toBe(false);
            expect(item.description()).toBe('');
        });
    });
});