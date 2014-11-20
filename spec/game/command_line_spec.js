require(['src/command_line', 'src/dataManager'], function (CommandLine, dataManager) {
    describe('Command line', function () {
        var commandLine,
            dummyItem = {
                id: function () { return 'brick'; },
                name: function () { return 'Brick'; },
                description: function () { return 'Old red brick with a writing on it.'; }
            };

        beforeEach(function () {
            commandLine = new CommandLine();
        });

        it('initializes with empty message list', function () {
            expect(commandLine.messages().length).toBe(0);
        });

        it('can receive and store a message', function () {
            var message = 'You see a large red tree';

            commandLine.write(message);

            expect(commandLine.messages().length).toBe(1);
            expect(commandLine.messages()[0].text).toBe(message);
        });

        it('stores messages in reverse order (newest first)', function () {
            var message = 'There is a three-headed monkey behind you.',
                message2 = 'It is selling these fine leather jackets.';

            commandLine.write(message);
            commandLine.write(message2);

            expect(commandLine.messages().length).toBe(2);
            expect(commandLine.messages()[0].text).toBe(message2);
            expect(commandLine.messages()[1].text).toBe(message);
        });

        it('can recognize items in messages by item id', function () {
            var message = 'You see a large red brick';

            spyOn(dataManager, 'get').and.returnValue([dummyItem]);

            commandLine.write(message);

            expect(commandLine.messages().length).toBe(1);
            expect(commandLine.messages()[0].parsedText).toBe('You see a large red <span class="item">brick</span>');
        });

        it('can recognize items in messages by item name', function () {
            var message = 'You see a large red Brick';

            spyOn(dataManager, 'get').and.returnValue([dummyItem]);

            commandLine.write(message);

            expect(commandLine.messages().length).toBe(1);
            expect(commandLine.messages()[0].parsedText).toBe('You see a large red <span class="item">Brick</span>');
        });

        it('can recognize multiple items in one message', function () {
            var message = 'Brick is everywhere you look. Among it you see a large red brick. It is your favourite kind of brick.';

            spyOn(dataManager, 'get').and.returnValue([dummyItem]);

            commandLine.write(message);

            expect(commandLine.messages().length).toBe(1);
            expect(commandLine.messages()[0].parsedText).toBe('<span class="item">Brick</span> is everywhere you look. Among it you see a large red <span class="item">brick</span>. It is your favourite kind of <span class="item">brick</span>.');
        });

        it('will not recognize items which are substring of another word', function () {
            var message = 'The person works as a bricklayer. His name was Perbrick.';

            spyOn(dataManager, 'get').and.returnValue([dummyItem]);

            commandLine.write(message);

            expect(commandLine.messages().length).toBe(1);
            expect(commandLine.messages()[0].parsedText).toBe(message);
        });

        it('can update last message', function () {
            var message = 'Use brick with ',
                changedMessage = 'Use apple with brick';

            commandLine.write(message);
            commandLine.write(message);
            commandLine.write(message);
            expect(commandLine.messages().length).toBe(3);
            expect(commandLine.messages()[2].text).toBe(message);

            commandLine.replaceLast(changedMessage);
            expect(commandLine.messages().length).toBe(3);
            expect(commandLine.messages()[2].text).toBe(changedMessage);
        });

        it('will notify subscribers, when updating last message', function () {
            var message = 'Use brick with ',
                changedMessage = 'Use apple with brick';

            spyOn(commandLine.messages, 'valueHasMutated');

            commandLine.write(message);
            commandLine.replaceLast(changedMessage);
            expect(commandLine.messages.valueHasMutated).toHaveBeenCalled();
        });

        it('will not do anything when updating last message without having any messages', function () {
            var message = 'Use brick with ';

            expect(commandLine.messages().length).toBe(0);

            commandLine.replaceLast(message);
            expect(commandLine.messages().length).toBe(0);
        });

        it('can recognize items in replaced messages', function () {
            var message = 'You see a large red apple',
                changedMessage = 'You see a large red Brick';

            spyOn(dataManager, 'get').and.returnValue([dummyItem]);

            commandLine.write(message);
            expect(commandLine.messages()[0].parsedText).toBe('You see a large red apple');

            commandLine.replaceLast(changedMessage);
            expect(commandLine.messages()[0].parsedText).toBe('You see a large red <span class="item">Brick</span>');
        });

    });
});