define(['knockout'], function (ko) {
    'use strict';

    return function DescriptionBox() {
        var self = this;

        self.name = ko.observable('');
        self.description = ko.observable('');

        self.display = function (item) {
            self.name(item.name());
            self.description(item.description());
        }
    }
});