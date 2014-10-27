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
            var jsonData = { "id": "cat", "name": "Rosa the cat", "obtainable": false },
                item;

            item = new Item(jsonData.id).fromJson(jsonData);

            expect(item.id()).toBe('cat');
            expect(item.name()).toBe('Rosa the cat');
            expect(item.description()).toBe('');
            expect(item.obtainable()).toBe(false);
        });

        it('can interact with an action', function () {
            var action = 'open';

            item.interact(action);
        });

        it('interacts with a deafult interaction if no action is specified', function () {
            item.interact();
        });
    });
});