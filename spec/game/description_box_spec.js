require(['src/description_box', 'src/item'], function (DescriptionBox, Item) {
    describe('Description box', function () {
        var descriptionBox;

        beforeEach(function () {
            descriptionBox = new DescriptionBox();
        });

        it('has name and description empty by default', function () {
            expect(descriptionBox.name()).toBe('');
            expect(descriptionBox.description()).toBe('');
        });

        it('could display a description of an item', function () {
            var item = new Item("key").name("Old key").description("Old rusty key you found in your pocket.");

            descriptionBox.display(item);
            expect(descriptionBox.name()).toBe(item.name());
            expect(descriptionBox.description()).toBe(item.description());
        });

        it('can be cleared', function () {
            var item = new Item("key").name("Old key").description("Old rusty key you found in your pocket.");

            descriptionBox.display(item);
            expect(descriptionBox.name()).toBe(item.name());
            expect(descriptionBox.description()).toBe(item.description());

            descriptionBox.clear();
            expect(descriptionBox.name()).toBe('');
            expect(descriptionBox.description()).toBe('');
        });
    });
});