define(['src/command_line', 'src/description_box', 'src/story_box', 'src/inventory', 'src/dataManager'],
    function (CommandLine, DescriptionBox, StoryBox, Inventory, dataManager) {
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
            self.storyBox = new StoryBox();

            self.storyBox.add("You see a large red tree.");
            self.storyBox.add("There is applejuice barrel under the tree.");
            self.storyBox.image("src/images/forest.jpg");

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

            self.useOn = function (item, event) {
                var source = item,
                    target = event.currentTarget;

                console.log(source.name());
            };

            callback(self);
        }

        dataManager.load(onDataLoad);
    }
});
