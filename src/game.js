define(['src/command_line', 'src/description_box', 'src/inventory', 'src/item'], function (CommandLine, DescriptionBox, Inventory, Item) {
    'use strict';

    return function Game() {
        var self = this,
            items = [];

        self.inventory = new Inventory();
        self.commandLine = new CommandLine();
        self.descriptionBox = new DescriptionBox();

        items.push(new Item('old_key').name('Old key').description('Old rusty key').obtainable(true));
        items.push(new Item('apple').name('Apple').description('Green apple from your garden').obtainable(true));

        self.inventory.add(items[0]);
        self.inventory.add(items[1]);

        self.commandLine.write("You see a large red tree.");
        self.commandLine.write("There are few apples around.");

        self.inventory.selectedItem.subscribe(function (item) {
            if (item) {
                self.descriptionBox.display(item);
            } else {
                self.descriptionBox.clear();
            }
        });
    }
});
