define(['knockout', 'src/inventory'], function (ko, Inventory) {
    'use strict';

    var components = [
        { name: 'inventory', vm: Inventory , template: 'src/templates/inventory.html' }
    ];

    function vmFactory(vmConstructor, options) {
        return new vmConstructor(options);
    }

    function registerComponent(name, vm, template) {
        if (!ko.components.isRegistered(name)) {
            ko.components.register(name, {
                viewModel: { instance: vm },
                template: { require: 'text!' + template }
            });
        }
    }

    function registerComponentsBatch(batch) {
        batch.forEach(function (component) {
            registerComponent(component.name, vmFactory(component.vm), component.template);
        })
    }

    return {
        register: registerComponent,
        registerBatch: registerComponentsBatch
    };
});
