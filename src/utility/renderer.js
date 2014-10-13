define(['knockout'], function (ko) {
    'use strict';

    function getNode(element) {
        return (typeof element === 'string') ? document.querySelector(element) : element;
    }

    function render(vm, element) {
        if (element) {
            ko.applyBindings(vm, getNode(element));
        } else {
            ko.applyBindings(vm);
        }
    }

    return {
        render: render
    };
});
