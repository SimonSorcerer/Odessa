define(['src/config', 'src/utility/parser'], function (config, parser) {
    'use strict';

    var data = [];

    function loadFile(fileName, callback) {
        var filePath = 'text!' + config.dataPath + fileName + config.dataExtension;

        require([filePath], function (jsonData) {
            data[fileName] = parser.parse(fileName, jsonData);
            callback();
        });
    }

    function load(callback) {
        var loadCount = config.dataFiles.length;

        config.dataFiles.forEach(function (fileName) {
            loadFile(fileName, function () {
                loadCount -= 1;

                if (loadCount <= 0) {
                    callback();
                }
            });
        });
    }

    function get(key) {
        return data[key] || [];
    }

    return {
        load: load,
        get: get
    }
});