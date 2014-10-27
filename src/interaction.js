define(['knockout'], function (ko) {
    'use strict';

    return function Interaction() {
        var self = this;

        self.item = null;
        self.target = null;
        self.action = null;
        self.isDefault = false;
        self.text = "";
        self.results = null;

        self.fromJson = function(json) {
            self.item = json.item;
            self.target = json.target || null;
            self.action = json.action;
            self.text = json.text;
            self.results = json.results;
            self.isDefault = json.default === undefined ? false : json.default;

            return self;
        };
    }
});

