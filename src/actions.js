define(['knockout'], function () {
    'use strict';

    var lookAt = { text: 'Look at' },
        pickUp = { text: 'Pick up' },
        open = { text: 'Open' },
        close = { text: 'Close' };

    return Object.freeze({
        default: lookAt,
        lookAt: lookAt,
        pickUp: pickUp,
        get: pickUp,
        open: open,
        close: close
    });
});