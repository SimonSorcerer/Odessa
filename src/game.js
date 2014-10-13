define(['src/command_line', 'src/inventory', 'src/item'], function (CommandLine, Inventory, Item) {
    'use strict';

    return function Game() {
        var self = this;

        self.inventory = new Inventory();
        self.commandLine = new CommandLine();

        self.inventory.add(new Item('old_key').name('Old key').description('Old rusty key').obtainable(true));
        self.inventory.add(new Item('apple').name('Apple').description('Green apple from your garden').obtainable(true));

        self.commandLine.write("You see a large red tree.");
        self.commandLine.write("There are few apples around.");
    }
});
