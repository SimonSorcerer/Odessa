define(['src/command_line', 'src/description_box', 'src/inventory', 'src/utility/parser', 'text!src/data/items.json'],
    function (CommandLine, DescriptionBox, Inventory, parser, itemsData) {
    'use strict';

    return function Game() {
        var self = this,
            items;

        self.inventory = new Inventory();
        self.commandLine = new CommandLine();
        self.descriptionBox = new DescriptionBox();

        items = parser.parse('items', itemsData);
        items.forEach(function (item) {
            self.inventory.add(item);
        });

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
