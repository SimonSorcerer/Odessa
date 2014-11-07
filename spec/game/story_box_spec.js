require(['src/story_box'], function (StoryBox) {
    describe('Story box', function () {
        var storyBox;

        beforeEach(function () {
            storyBox = new StoryBox();
        });

        it('has stories collection empty by default', function () {
            expect(storyBox.stories()).toEqual([]);
        });

        it('has image path empty by default', function () {
            expect(storyBox.image()).toBe('');
        });

        it('can receive and store a story', function () {
            var story = "Once upon a time ...";

            expect(storyBox.stories().length).toBe(0);

            storyBox.add(story);
            expect(storyBox.stories().length).toBe(1);
            expect(storyBox.stories()[0]).toBe(story);
        })
    });
});