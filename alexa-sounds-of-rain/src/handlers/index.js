'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = undefined;

var HELP_MESSAGE = "テスト中です。ヘルプメッセージ";
var HELP_REPROMPT = "どうしますか？";
var STOP_MESSAGE = "さようなら";

exports.handler = function(event, context, callback) {
    console.log('start handler');
    var alexa = Alexa.handler(event, context);
    // alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
    console.log('end handler')
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('SoundsOfRainIntent');
    },
    'SoundsOfRainIntent': function () {
        console.log('Start SoundsOfRainIntent');
        let speechOut = '雨の音を再生します。';
        speechOut += "<audio src='' />";
        this.emit(':tell', speechOut);
        // this.emit(':tell', 'aiueo');
        console.log('End SoundsOfRainIntent');
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'Unhandled': function () {
        this.emit(':tell', 'こんにちは');
    }
};
