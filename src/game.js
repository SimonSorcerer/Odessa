define(['src/command_line', 'src/description_box', 'src/inventory', 'src/dataManager'],
    function (CommandLine, DescriptionBox, Inventory, dataManager) {
    'use strict';

    return function Game(callback) {
        var self = this,
            items = [],
            interactions = [];

        function findDefaultInteraction(item) {
            var found;

            interactions.forEach(function (interaction) {
                if (interaction.item === item.id() && interaction.isDefault) {
                    found = interaction;
                }
            });

            return found;
        }

        function onDataLoad() {
            interactions = dataManager.get('interactions');
            items = dataManager.get('items');

            self.inventory = new Inventory();
            items.forEach(function (item) {
                self.inventory.add(item);
            });

            self.commandLine = new CommandLine();
            self.descriptionBox = new DescriptionBox();

            self.commandLine.write("You see a large red tree.");
            self.commandLine.write("There is applejuice barrel under the tree.");

            self.inventory.selectedItem.subscribe(function (item) {
                if (item) {
                    self.descriptionBox.display(item);
                } else {
                    self.descriptionBox.clear();
                }
            });

            self.interact = function (item) {
                var defaultAction = findDefaultInteraction(item);

                if (defaultAction) {
                    self.commandLine.write(defaultAction.action + ' ' + item.name());
                } else {
                    self.commandLine.write('You are not sure what to do with ' + item.name());
                }
            };

            callback(self);
        }

        dataManager.load(onDataLoad);
    }
});
