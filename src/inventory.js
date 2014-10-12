define(['../lib/knockout/knockout', 'src/item'], function (ko, Item) {
    'use strict';

    return function Inventory() {
        var self = this;

        self.items = ko.observableArray();
        self.selectedItem = ko.observable();

        self.add = function (item) {
            self.items.push(item);
        };

        self.selectById = function (id) {
            self.items().forEach(function (item) {
                if (item.id() === id) {
                    self.selectedItem(item);
                }
            });
        };

        self.add(new Item('apple').name('Apple').description('Red apple with a worm inside'));
        self.add(new Item('old_key').name('Old Key').description('Old rusty key'));
    };
});