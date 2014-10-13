require(['src/command_line'], function (CommandLine) {
    describe('Command line', function () {
        var commandLine;

        beforeEach(function () {
            commandLine = new CommandLine();
        });

        it('initializes with empty message list', function () {
            expect(commandLine.messages().length).toBe(0);
        });

        it('can receive and store a message', function () {
            var message = 'You see a large red tree',
                count = commandLine.messages().length;

            commandLine.write(message);

            expect(commandLine.messages().length).toBe(count + 1);
            expect(commandLine.messages()[count]).toBe(message);
        });
    });
});