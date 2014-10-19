define(['src/item'], function (Item) {
    'use strict';

    function createItem(jsonData) {
        return new Item(jsonData.id).fromJson(jsonData);
    }

    function parseItems(json) {
        var result = [];

        if (json) {
            json = JSON.parse(json);

            if (json instanceof Array) {
                json.forEach(function (jsonItem) {
                    result.push(createItem(jsonItem));
                });
            } else {
                result.push(createItem(json));
            }
        }

        return result;
    }

    return {
        parse: parseItems
    };
});
