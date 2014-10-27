require(['src/interaction'], function (Interaction) {
    'use strict';

    describe('interaction', function () {
        var interaction,
            jsonData = {
                "item": "old_key",
                "target": "main_door",
                "action": "use",
                "text": "With loud 'clank' you unlock the door",
                "default": true,
                "results": [
                    {
                        "item": "main_door",
                        "state": 3
                    }
                ]
            };

        beforeEach(function () {
            interaction = new Interaction();
        });

        it('can be set by provided Json data', function () {
            interaction.fromJson(jsonData);

            expect(interaction.item).toBe("old_key");
            expect(interaction.target).toBe("main_door");
            expect(interaction.action).toBe("use");
            expect(interaction.isDefault).toBe(true);
            expect(interaction.text).toBe("With loud 'clank' you unlock the door");
            expect(Array.isArray(interaction.results)).toBe(true);
        });

        it('is not default by default :)', function () {
            delete jsonData["default"];
            interaction.fromJson(jsonData);

            expect(interaction.isDefault).toBe(false);
        });
    });
});