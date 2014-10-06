/*globals require, window, setTimeout*/
(function (window) {
    'use strict';

    var src = '../src/',
        jasmineCore = '/spec/lib/jasmine-2.0.0/',
        specPath = '../spec/',
        specs;

    window.specConfig = {
        src: src,
        knockout: '../lib/knockout/knockout'
    };

    require.config({
        baseUrl: src,
        paths: {
            jasmine: jasmineCore + 'jasmine',
            jasmineHtml: jasmineCore + 'jasmine-html',
            boot: jasmineCore + 'boot'
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
        specPath + 'game/item_spec',
        specPath + 'game/inventory_spec'
    ];

    require(['boot'], function () {
        require(specs, function () {
            setTimeout(function () { window.onload(); }, 500);
        });
    });
}(window));
