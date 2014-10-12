define(['lib/knockout/knockout', 'src/inventory'], function (ko, Inventory) {
    'use strict';

    require.config({
        baseUrl: 'src',
        paths: {
            knockout: 'lib/knockout/knockout-min'
        }
    });

    ko.components.register('inventory', {
        viewModel:  Inventory,
        template: { require: 'text!src/templates/inventory.html' }
    });
});
