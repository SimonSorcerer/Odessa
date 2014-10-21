require(['src/action'], function (Action) {
    'use strict';

    describe('action', function () {
        var action,
            id = 'lookAt';

        beforeEach(function () {
            action = new Action(id);
        });

        it('has mandatory identifier', function () {
            expect(action.id()).toBeDefined();
            expect(action.id()).toBe(id);
        });

        it('cannot change its identifier', function () {
            var different_id = 'pickUp';

            action.id(different_id);
            expect(action.id()).toBe(id);
        });

        it('has text representation equal to identifier by default', function () {
            expect(action.text()).toBe(action.id());
        });

        it('can have name changed', function () {
            var text = 'Look At';

            action.text(text);
            expect(action.text()).toBe(text);
        });

        it('can chain its attribute setters', function () {
            var text1 = 'Pick up',
                text2 = 'Get';

            action.text(text1).text(text2);
            expect(action.text()).toBe(text2);
        });

        it('can be set by provided Json data', function () {
            var jsonData = { "id": "pickUp", "text": "Pick up" },
                action;

            action = new Action(jsonData.id).fromJson(jsonData);

            expect(action.id()).toBe('pickUp');
            expect(action.text()).toBe('Pick up');
        });

        it('can chain json setter method', function () {
            var jsonData = { "id": "pickUp", "text": "Pick up" },
                differentText = "Look at",
                action;

            action = new Action(jsonData.id).fromJson(jsonData).text(differentText);

            expect(action.id()).toBe('pickUp');
            expect(action.text()).toBe(differentText);
        });
    });
});