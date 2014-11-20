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

        it('updates description box when an item in inventory is hovered', function (done) {
            new Game(function (game) {
                spyOn(game.descriptionBox, 'display');
                spyOn(game.descriptionBox, 'clear');

                game.inventory.selectedItem(dummyItem);
                expect(game.descriptionBox.display).toHaveBeenCalledWith(dummyItem);
                expect(game.descriptionBox.clear).not.toHaveBeenCalled();

                done();
            });
        });

        it('clears description box when another item stops being hovered', function (done) {
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

        it('can select item in inventory to be used on different item', function (done) {
            new Game(function (game) {
                spyOn(game.commandLine, 'write');

                game.use(dummyItem);
                expect(game.commandLine.write).toHaveBeenCalledWith("Use " + dummyItem.name() + " with ");

                done();
            })
        });

        it('updates last message in command line when using an item in inventory and hovering second item', function (done) {
            var anotherDummyItem = {
                id: function () { return 'window'; },
                name: function () { return 'Window'; },
                description: function () { return 'Small squared window.'; }
            };

            new Game(function (game) {
                spyOn(game.commandLine, 'write');
                spyOn(game.commandLine, 'replaceLast');

                game.use(dummyItem);
                expect(game.commandLine.write).toHaveBeenCalledWith("Use " + dummyItem.name() + " with ");

                game.inventory.selectedItem(anotherDummyItem);
                expect(game.commandLine.replaceLast).toHaveBeenCalledWith("Use " + dummyItem.name() + " with " + anotherDummyItem.name());

                done();
            });
        });

        it('updates last message in command line when using an item in inventory and another item stops being hovered', function (done) {
            var anotherDummyItem = {
                id: function () { return 'window'; },
                name: function () { return 'Window'; },
                description: function () { return 'Small squared window.'; }
            };

            new Game(function (game) {
                spyOn(game.commandLine, 'write');
                spyOn(game.commandLine, 'replaceLast');

                game.use(dummyItem);
                game.inventory.selectedItem(anotherDummyItem);
                expect(game.commandLine.replaceLast).toHaveBeenCalledWith("Use " + dummyItem.name() + " with " + anotherDummyItem.name());

                game.inventory.selectedItem(undefined);
                expect(game.commandLine.replaceLast).toHaveBeenCalledWith("Use " + dummyItem.name() + " with ");

                done();
            });
        });
    });
});