require(['src/game'], function (Game) {
    describe('Inventory', function () {
        var game,
            dummyItem = {
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
    });
});