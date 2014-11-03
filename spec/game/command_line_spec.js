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
    });
});