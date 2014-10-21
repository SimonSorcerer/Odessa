define(['knockout'], function (ko) {
    'use strict';

    return function Action(id) {
        var self = this;

        self.id = function () {
            return id;
        };
        self.text = ko.observable(id);

        self.fromJson = function(json) {
            self.text(json.text || id);

            return self;
        };
    }
});