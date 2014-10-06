define(['../lib/knockout/knockout'], function (ko) {
    'use strict';

    return function Item(id) {
        var self = this;

        self.id = function () {
            return id;
        };
        self.name = ko.observable(id);
        self.description = ko.observable('');
        self.obtainable = ko.observable(true);

        self.take = function(callback) {
            if (self.obtainable()) {
                callback.success();
            } else {
                callback.fail();
            }
        }
    }
});