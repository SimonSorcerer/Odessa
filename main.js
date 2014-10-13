define(['lib/knockout/knockout', 'src/game'], function (ko, Game) {
    'use strict';

    require.config({
        baseUrl: 'src',
        paths: {
            knockout: 'lib/knockout/knockout-min'
        }
    });


    ko.applyBindings(new Game());
});
