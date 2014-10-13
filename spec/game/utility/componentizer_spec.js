require(['src/utility/componentizer', 'knockout'], function (componentizer, ko) {
    'use strict';

    describe('componentizer', function () {
        it('can register a new component with provided name, templatePath and view model instance', function () {
            var name = 'test_component',
                templatePath = 'template.html',
                vm = { something: 'yes' };

            spyOn(ko.components, 'register');
            spyOn(ko.components, 'isRegistered').and.returnValue(false);
            componentizer.register(name, vm, templatePath);

            expect(ko.components.register).toHaveBeenCalledWith(name, {
                viewModel: { instance: vm },
                template: { require: 'text!' + templatePath }
            });
        });

        it('will not register a component with duplicate name to already registered component', function () {
            var name = 'awesome_component',
                templatePath = 'template.html',
                vm = { stuff: 'no' };

            spyOn(ko.components, 'register');
            spyOn(ko.components, 'isRegistered').and.returnValue(true);
            componentizer.register(name, vm, templatePath);

            expect(ko.components.register).not.toHaveBeenCalled();
        });

        it('can register components in a batch', function () {
            var batch = [
                { name: 'first_compo', vm: function () { return; }, template: 'batman.html' },
                { name: 'second_compo', vm: function () { return; }, template: 'joker.html' },
                { name: 'third_compo', vm: function () { return; }, template: 'robin.html' }
            ];

            spyOn(ko.components, 'register');
            spyOn(ko.components, 'isRegistered').and.returnValue(false);
            componentizer.registerBatch(batch);

            expect(ko.components.register.calls.count()).toBe(batch.length);
        });
    });
});