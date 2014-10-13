define(['knockout'], function (ko) {
    'use strict';

    return function CommandLine() {
        var self = this;

        self.messages = ko.observableArray([]);

        self.write = function (message) {
            self.messages.push(message);
        }
    };
});