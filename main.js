define(['src/inventory', 'src/item', 'lib/knockout/knockout'], function (Inventory, Item, ko) {
    'use strict';

    require.config({
        baseUrl: 'src',
        paths: {
            knockout: 'lib/knockout/knockout-min'
        }
    });

    var test_inventory = new Inventory();
    test_inventory.add(new Item('apple').name('Apple').description('Red apple with a worm inside'));
    test_inventory.add(new Item('old_key').name('Old Key').description('Old rusty key'));

    ko.applyBindings(test_inventory);
});
