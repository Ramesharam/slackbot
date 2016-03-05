/**
 * Requires (Custom Modules)
 */
var helper = require('./helper'),
    commands = require('./commands');

/**
 * Main Lambda function
 */
exports.handler = function(event, context) {
    processCommands(event, context);
};

/**
 * Process Commands
 */
function processCommands(event, context) {
    if(event && event.text && event.trigger_word) {
        if(!commands[event.trigger_word]) {
            context.fail({text: 'Error: Invalid Command'});
        }

        var command = event.trigger_word,
            commandArguments = helper.parseCommand(event.text.trim());

        commands[command](commandArguments[command]).then(function(response) {
            console.log('Success: ' + JSON.stringify(response));
            context.succeed(response);
        }).catch(function(error) {
            console.log('Error: ' + JSON.stringify(error));
            context.fail({text: error});
        });
    } else {
        context.fail({text: 'Error: Event not specified'});
    }
}
/*
var event = { 'text': 'ipinfo test', 'trigger_word': 'ipinfo'},
    context = {
        fail: function (error) {
            console.log(error);
        },
        succeed: function (success) {
            console.log(success);
        }
    };
processCommands(event, context);
*/