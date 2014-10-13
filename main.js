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
        var game = new Game(),
            components = [
                { name: 'inventory', vm: game.inventory , template: 'src/templates/inventory.html' }
            ];

        componentizer.registerBatch(components);
        renderer.render(game);
    });
});
