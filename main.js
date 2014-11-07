define(function () {
    'use strict';

    var srcPath = 'src/',
        libPath = 'lib/';

    require.config({
        baseUrl: '',
        paths: {
            knockout: libPath + 'knockout/knockout',
            text: libPath + '/text/text'
        }
    });

    require(['src/utility/renderer', 'src/utility/componentizer', 'src/Inventory', 'src/game'], function (renderer, componentizer, Inventory, Game) {
        function onGameLoad(game) {
            var components = [
                { name: 'inventory', vm: game.inventory , template: 'src/templates/inventory.html' },
                { name: 'command_line', vm: game.commandLine, template: 'src/templates/command_line.html' },
                { name: 'description_box', vm: game.descriptionBox, template: 'src/templates/description_box.html' },
                { name: 'story_box', vm: game.storyBox, template: 'src/templates/story_box.html' }
            ];

            componentizer.registerBatch(components);
            renderer.render(game, "#game");
        }

        new Game(onGameLoad);
    });
});
