define(['knockout'], function (ko) {
    'use strict';

    function render(vm, uiElement) {
        if (uiElement) {
            ko.applyBindings(vm, uiElement);
        } else {
            ko.applyBindings(vm);
        }
    }

    return {
        render: render
    };
});
