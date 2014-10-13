define(['src/inventory', 'src/item'], function (Inventory, Item) {
    'use strict';

    return function Game() {
        var self = this;

        self.inventory = new Inventory();

        self.inventory.add(new Item('old_key').name('Old key').description('Old rusty key').obtainable(true));
        self.inventory.add(new Item('apple').name('Apple').description('Green apple from your garden').obtainable(true));
    }
});
