define(['src/command_line', 'src/description_box', 'src/inventory', 'src/utility/parser', 'text!src/data/items.json', 'text!src/data/interactions.json'],
    function (CommandLine, DescriptionBox, Inventory, parser, itemsData, interactionsData) {
    'use strict';

    return function Game() {
        var self = this,
            items,
            interactions;

        self.inventory = new Inventory();
        self.commandLine = new CommandLine();
        self.descriptionBox = new DescriptionBox();
        interactions = parser.parse('interactions', interactionsData);

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

        function findDefaultInteraction(item) {
            var found;

            interactions.forEach(function (interaction) {
                if (interaction.item === item.id() && interaction.isDefault) {
                    found = interaction;
                }
            });

            return found;
        }

        self.interact = function (item) {
            var defaultAction = findDefaultInteraction(item);

            if (defaultAction) {
                self.commandLine.write(defaultAction.action + ' ' + item.name());
            } else {
                self.commandLine.write('You are not sure what to do with ' + item.name());
            }
        };
    }
});
