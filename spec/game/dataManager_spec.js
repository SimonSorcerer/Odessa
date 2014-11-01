require(['src/dataManager', 'src/utility/parser', 'src/config'], function (dataManager, parser, config) {
    'use strict';

    describe('data manager', function () {
        it('loads all the data files from config', function (done) {
            spyOn(parser, 'parse');

            dataManager.load(function () {
                expect(parser.parse).toHaveBeenCalled();
                expect(parser.parse.calls.count()).toBe(config.dataFiles.length);

                done();
            });
        });

        it('provides all the loaded data', function (done) {
            spyOn(parser, 'parse').and.returnValue([{ id: "key", name: "Brass key" }, { id: "orange", name: "Orange" }]);

            dataManager.load(function () {
                var items = dataManager.get('items');

                expect(items.length).toBe(2);
                expect(items[0].id).toBe('key');
                expect(items[1].id).toBe('orange');

                done();
            });
        });

        it('returns empty array on not existing or not loaded data', function (done) {
            spyOn(parser, 'parse');

            dataManager.load(function () {
                var items = dataManager.get('items');

                expect(items).toBeDefined();
                expect(items.length).toBe(0);
                done();
            });
        });
    });
});