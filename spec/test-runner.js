requirejs.config({
    baseUrl: "../js/",
    paths: {
        spec: '../spec/',
        jasmine: '../lib/jasmine',
        'jasmine-html': '../lib/jasmine-html',
        knockout: '../lib/knockout-3.0.0'
    },
    shim: {
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        }
    }
});

require(["jasmine-html", "spec/inventory_spec"], function(jasmine) {
    var jasmineEnv = jasmine.getEnv();

    jasmineEnv.addReporter(
        new jasmine.HtmlReporter()
    );

    // Run all the loaded test specs.
    jasmineEnv.execute();
})();