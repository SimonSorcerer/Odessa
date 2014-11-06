define(['knockout'], function (ko) {
    'use strict';

    return function Item(id) {
        var self = this;

        self.id = function () {
            return id;
        };
        self.name = ko.observable(id);
        self.description = ko.observable('');
        self.obtainable = ko.observable(true);
        self.states = ko.observableArray([]);

        self.take = function(callback) {
            if (self.obtainable()) {
                callback.success();
            } else {
                callback.fail();
            }
        };

        self.interact = function(action) {
        };

        self.fromJson = function(json) {
            self.name(json.name || id);
            self.description(json.description || '');
            self.obtainable(json.obtainable === undefined ? true : json.obtainable);
            self.states(json.states || []);

            return self;
        };

        function getStateId(idNumber) {
            return self.id() + '_' + idNumber;
        }

        function findState(idNumber) {
            for (var i = 0; i < self.states().length; i += 1) {
                if (self.states()[i].id === getStateId(idNumber)) {
                    return self.states()[i];
                }
            }
        }

        self.switchToState = function(idNumber) {
            var newState = findState(idNumber);

            if (newState) {
                Object.keys(newState).forEach(function (key) {
                    self[key](newState[key]);
                });
            }
        };
    }
});