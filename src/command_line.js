define(['knockout', 'src/dataManager'], function (ko, dataManager) {
    'use strict';

    return function CommandLine() {
        var self = this;

        function addItemSpanFor(needle, text) {
            var re = new RegExp('\\b' + needle + '\\b', 'g');
            console.log(re);

            return text.replace(re, function (match) {
                return '<span class="item">' + match + '</span>'
            });
        }

        function parseItem(item, text) {
            text = addItemSpanFor(item.id(), text);

            if (item.id() !== item.name()) {
                text = addItemSpanFor(item.name(), text);
            }

            return text;
        }

        function parse(text) {
            var items = dataManager.get('items'),
                parsedText = text;

            items.forEach(function (item) {
                parsedText = parseItem(item, parsedText)
            });

            return parsedText;
        }

        function createMessage(text) {
            return {
                text: text,
                parsedText: parse(text)
            };
        }

        self.messages = ko.observableArray([]);

        self.write = function (text) {
            self.messages.push(createMessage(text));
        }
    };
});