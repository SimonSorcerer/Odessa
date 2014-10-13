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
            boot: jasminePath + 'boot'
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
        specPath + 'inventory_spec',
        specPath + '/utility/renderer_spec',
        specPath + '/utility/componentizer_spec'
    ];

    require(['boot'], function () {
        require(specs, function () {
            setTimeout(function () { window.onload(); }, 500);
        });
    });
}(window));
