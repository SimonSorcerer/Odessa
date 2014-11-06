require(['src/game', 'src/dataManager'], function (Game, dataManager) {
    describe('Game', function () {
        var dummyItem = {
                id: function () { return 'brick'; },
                name: function () { return 'Brick'; },
                description: function () { return 'Old red brick with a writing on it.'; }
            },
            dummyInteraction = {
                item: "brick",
                action: "throw",
                text: "With some careful aiming you threw the brick into the window",
                isDefault: true
            };

        it('contains all the game entities', function (done) {
            new Game(function (game) {
                expect(game.inventory).not.toBeUndefined();
                expect(game.descriptionBox).not.toBeUndefined();
                expect(game.commandLine).not.toBeUndefined();

                done();
            });
        });

        it('updates description box when selected item in inventory changes to an item', function (done) {
            new Game(function (game) {
                spyOn(game.descriptionBox, 'display');
                spyOn(game.descriptionBox, 'clear');

                game.inventory.selectedItem(dummyItem);
                expect(game.descriptionBox.display).toHaveBeenCalledWith(dummyItem);
                expect(game.descriptionBox.clear).not.toHaveBeenCalled();

                done();
            });
        });

        it('clears description box when selected item in inventory changes to undefined', function (done) {
            new Game(function (game) {
                spyOn(game.descriptionBox, 'display');
                spyOn(game.descriptionBox, 'clear');

                // need to set selected item to something different from undefined first
                game.inventory.selectedItem(dummyItem);
                game.inventory.selectedItem(undefined);

                expect(game.descriptionBox.display.calls.count()).toBe(1);
                expect(game.descriptionBox.clear).toHaveBeenCalled();

                done();
            });
        });

        it('can interact with an item in inventory', function (done) {
            spyOn(dataManager, 'get').and.callFake(function (dataType) {
                if (dataType === 'items') {
                    return [dummyItem];
                } else if (dataType === 'interactions') {
                    return [dummyInteraction];
                }
            });

            new Game(function (game) {
                spyOn(game.commandLine, 'write');

                game.interact(dummyItem);
                expect(game.commandLine.write).toHaveBeenCalledWith("throw " + dummyItem.name());

                done();
            });
        });
    });
});