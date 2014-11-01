require(['src/game', 'src/dataManager'], function (Game, dataManager) {
    describe('Game', function () {
        var game,
            dummyItem = {
                id: function () { return 'Brick'; },
                name: function () { return 'Brick'; },
                description: function () { return 'Old red brick with a writing on it.'; }
            };

        beforeEach(function () {
            game = new Game();
        });

        it('contains all the game entities', function () {
            expect(game.inventory).not.toBeUndefined();
            expect(game.descriptionBox).not.toBeUndefined();
            expect(game.commandLine).not.toBeUndefined();
        });

        it('updates description box when selected item in inventory changes to an item', function () {
            spyOn(game.descriptionBox, 'display');
            spyOn(game.descriptionBox, 'clear');

            game.inventory.selectedItem(dummyItem);
            expect(game.descriptionBox.display).toHaveBeenCalledWith(dummyItem);
            expect(game.descriptionBox.clear).not.toHaveBeenCalled();
        });

        it('clears description box when selected item in inventory changes to undefined', function () {
            spyOn(game.descriptionBox, 'display');
            spyOn(game.descriptionBox, 'clear');

            // need to set selected item to something different from undefined first
            game.inventory.selectedItem(dummyItem);
            game.inventory.selectedItem(undefined);

            expect(game.descriptionBox.display.calls.count()).toBe(1);
            expect(game.descriptionBox.clear).toHaveBeenCalled();
        });

        it('can interact with an item in inventory', function () {
            var dummyInteraction = {
                "item": "brick",
                "action": "throw",
                "text": "With some careful aiming you threw the brick into the window",
                "default": true
            };

            spyOn(dataManager, 'get').and.callFake(function (dataType) {
                if (dataType === 'items') {
                    return dummyItem;
                } else if (dataType === 'interactions') {
                    return dummyInteraction;
                }
            });

            game = new Game();
            spyOn(game.commandLine, 'write');

            game.interact(dummyItem);

            expect(game.commandLine.write).toHaveBeenCalledWith("throw " + dummyItem.name());
        });
    });
});