define(['knockout'], function (ko) {
    'use strict';

    function registerComponent(name, vm, template) {
        var templatePath = 'text!' + template;

        if (!ko.components.isRegistered(name)) {
            ko.components.register(name, {
                viewModel: { instance: vm },
                template: { require: templatePath }
            });
        }
    }

    function registerComponentsBatch(batch) {
        batch.forEach(function (component) {
            registerComponent(component.name, component.vm, component.template);
        })
    }

    return {
        register: registerComponent,
        registerBatch: registerComponentsBatch
    };
});
