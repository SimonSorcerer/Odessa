define(['../lib/knockout/knockout'], function (ko) {
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
        }
    };
});