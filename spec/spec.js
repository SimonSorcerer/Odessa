(function (window) {
    'use strict';

    var srcPath = 'src/',
        libPath = 'lib/',
        specPath = 'spec/game/',
        jasminePath = 'spec/lib/jasmine-2.0.0/',
        specs;

    require.config({
        baseUrl: '..',
        paths: {
            src: srcPath,
            jasmine: jasminePath + 'jasmine',
            jasmineHtml: jasminePath + 'jasmine-html',
            knockout: libPath + 'knockout/knockout',
            boot: jasminePath + 'boot',
            text: libPath + '/text/text'
        },
        shim: {
            jasmine: {
                exports: 'jasmine'
            },
            jasmineHtml: {
                deps: ['jasmine'],
                exports: 'jasmine'
            },
            boot: {
                deps: ['jasmine', 'jasmineHtml'],
                exports: 'jasmine'
            }
        }
    });

    specs = [
        specPath + 'item_spec',
        specPath + 'action_spec',
        specPath + 'inventory_spec',
        specPath + 'command_line_spec',
        specPath + 'description_box_spec',
        specPath + 'game_spec',
        specPath + '/utility/renderer_spec',
        specPath + '/utility/componentizer_spec',
        specPath + '/utility/parser_spec'
    ];

    require(['boot'], function () {
        require(specs, function () {
            setTimeout(function () { window.onload(); }, 500);
        });
    });
}(window));
