define(['knockout'], function (ko) {
    'use strict';

    return function StoryBox() {
        var self = this;

        self.stories = ko.observableArray([]);
        self.image = ko.observable('');

        self.add = function (story) {
            self.stories().push(story)
        };
    }
});