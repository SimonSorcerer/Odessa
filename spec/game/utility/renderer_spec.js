require(['src/utility/renderer', 'knockout'], function (renderer, ko) {
    'use strict';

    describe('renderer', function () {
        it('applies bindings to selected element with provided view model', function () {
            var vm = {},
                element = document.createElement('div');

            spyOn(ko, 'applyBindings');
            renderer.render(vm, element);

            expect(ko.applyBindings).toHaveBeenCalledWith(vm, element);
        });

        it('applies bindings to element that matches selector with provided view model if element is selector string', function () {
            var vm = {},
                element = document.createElement('div'),
                selectorQuery = "#main";

            element.id = "main";
            document.body.appendChild(element);

            spyOn(ko, 'applyBindings');
            renderer.render(vm, selectorQuery);

            expect(ko.applyBindings).toHaveBeenCalledWith(vm, element);
        });

        it('applies bindings globally with provided view model when no element is specified', function () {
            var vm = {};

            spyOn(ko, 'applyBindings');
            renderer.render(vm);

            expect(ko.applyBindings).toHaveBeenCalledWith(vm);
        });
    });
});