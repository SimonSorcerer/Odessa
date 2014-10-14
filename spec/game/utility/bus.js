require(['src/utility/bus', 'knockout'], function (Bus, ko) {
    'use strict';

    describe('bus', function () {
        var bus;

        beforeEach(function () {
            bus = new Bus();
        });

        it('can publish a simple message to a topic', function () {
            var topicName = 'happy stuff',
                load = 1234;

            //bus.publish(topicName, load);
        });
    });
});