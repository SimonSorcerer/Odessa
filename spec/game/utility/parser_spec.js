require(['src/utility/parser', 'src/item'], function (parser, Item) {
    'use strict';

    describe('parser', function () {
        var mockItem = function () {
            return {
                fromJson: function () { return; }
            };
        };

        it('will return empty array on empty or undefined json data', function () {
            var result = parser.parse('items');
            expect(result).toEqual([]);

            result = parser.parse('items', '[]');
            expect(result).toEqual([]);
        });

        //TODO: replace with spy on Item or with Item mock
        it('will create items collection with one item from parsed object json data', function () {
            var testJson = '{ "id": "pear", "name": "Tasty pear" }',
                result;

            result = parser.parse('items', testJson);

            expect(result).toBeDefined();
            expect(result.length).toBe(1);
            expect(result[0].id()).toBe("pear");
            expect(result[0].name()).toBe("Tasty pear");
        });

        //TODO: replace with spy on Item or with Item mock
        it('will create items collection with multiple items from parsed array json data', function () {
            var testJson = '[{ "id": "key", "name": "Brass key" }, { "id": "orange", "name": "Orange" }]',
                result = parser.parse('items', testJson);

            expect(result).toBeDefined();
            expect(result.length).toBe(2);
            expect(result[0].id()).toBe("key");
            expect(result[0].name()).toBe("Brass key");
            expect(result[1].id()).toBe("orange");
            expect(result[1].name()).toBe("Orange")
        });

        //TODO: replace with spy on Action or with Action mock
        it('will create actions object with multiple items from parsed json data', function () {
            var testJson = '[{ "id": "open", "text": "Open" }, { "id": "close", "text": "Close" } ]',
                result = parser.parse('actions', testJson);

            expect(result).toBeDefined();
            expect(result.length).toBe(2);
            expect(result[0].id()).toBe("open");
            expect(result[0].text()).toBe("Open");
            expect(result[1].id()).toBe("close");
            expect(result[1].text()).toBe("Close");
        });
    });
});