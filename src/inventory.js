define(['knockout', 'src/item'], function (ko, Item) {
    'use strict';

    return function Inventory() {
        var self = this;

        self.items = ko.observableArray();
        self.selectedItem = ko.observable();

        self.interact = function (item) {
            item.interact();
        };

        self.select = function (item) {
            self.selectedItem(item);
        };

        self.clearSelection = function () {
            self.selectedItem(undefined);
        };

        self.add = function (item) {
            self.items.push(item);
        };
    };
});