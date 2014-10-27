define(['src/item', 'src/action', 'src/interaction'], function (Item, Action, Interaction) {
    'use strict';

    function parseJson(data) {
        var parsedData = [];

        if (data) {
            parsedData = JSON.parse(data);

            if (parsedData instanceof Array) {
                return parsedData;
            } else {
                return new Array(parsedData);
            }
        }

        return parsedData;
    }

    function createModels(data, Entity) {
        var result = [],
            parsedData;

        parsedData = parseJson(data);
        parsedData.forEach(function (jsonItem) {
            result.push(new Entity(jsonItem.id).fromJson(jsonItem));
        });

        return result;
    }

    function parseFactory(type, json) {
        switch (type) {
            case "items": return createModels(json, Item);
            case "actions": return createModels(json, Action);
            case "interactions": return createModels(json, Interaction);
        }
    }

    return {
        parse: parseFactory
    };
});
