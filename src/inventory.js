define(['knockout', 'src/item'], function (ko, Item) {
    'use strict';

    return function Inventory() {
        var self = this;

        self.items = ko.observableArray();
        self.selectedItem = ko.observable();

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