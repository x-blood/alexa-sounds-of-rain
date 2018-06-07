'use strict';
var Alexa = require('alexa-sdk');

var HELP_MESSAGE = "雨音を再生して、や、雨音を流して、などの発音で、雨音を再生します。現在のバージョンは、" + process.env.Version + "です。";
var STOP_MESSAGE = "<say-as interpret-as=\"interjection\">バイバイ</say-as>";
var UNHANDLED_MESSAGE = "<say-as interpret-as=\"interjection\">ありゃ</say-as>";

exports.handler = function(event, context, callback) {
    console.log('[DEBUG]start handler');
    var alexa = Alexa.handler(event, context);
    console.log('[DEBUG]AppId : ' + process.env.AppId);
    alexa.appId = process.env.AppId;
    alexa.registerHandlers(handlers);
    alexa.execute();
    console.log('[DEBUG]end handler')
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('SoundsOfRainIntent');
    },
    'SoundsOfRainIntent': function () {

        var soundFileBaseUrl = process.env.SoundFileBaseUrl;
        console.log('[DEBUG]soundFileBaseUrl : ' + soundFileBaseUrl);
        var soundFileBaseFileName = process.env.SoundFileBaseName;
        console.log('[DEBUG]soundFileBaseFileName : ' + soundFileBaseFileName);

        console.log('Start SoundsOfRainIntent');
        let speechOut = '<say-as interpret-as="interjection">んじゃ</say-as>、雨音を再生します。';
        speechOut += "<audio src='" + soundFileBaseUrl + soundFileBaseFileName + "-001.mp3' />";
        this.emit(':tell', speechOut);
        console.log('End SoundsOfRainIntent');
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        this.emit(':ask', speechOutput);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'Unhandled': function () {
        this.emit(':tell', UNHANDLED_MESSAGE);
    }
};
