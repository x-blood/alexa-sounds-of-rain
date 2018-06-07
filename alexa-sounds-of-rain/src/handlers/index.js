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
        // this.emit(':tell', speechOut);

        this.response.audioPlayerPlay('REPLACE_ALL',
            soundFileBaseUrl + soundFileBaseFileName + "-001.mp3",
            "soundsOfRainToken", null, 0);
        this.emit(':responseReady');

        console.log('End SoundsOfRainIntent');
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':tell', HELP_MESSAGE);
    },
    'AMAZON.CancelIntent': function () {
        // this.emit(':tell', STOP_MESSAGE);
        this.response.audioPlayerStop();
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        // this.emit(':tell', STOP_MESSAGE);
        this.response.audioPlayerStop();
        this.emit(':responseReady');
    },
    'AMAZON.PauseIntent': function () {
        this.response.audioPlayerStop();
        this.emit(':responseReady');
    },
    'AMAZON.ResumeIntent': function () {
        this.emit('SoundsOfRainIntent');
    },
    'Unhandled': function () {
        this.emit(':tell', UNHANDLED_MESSAGE);
    },

    // 再生開始時
    'PlaybackStarted': function () {
        this.emit(':responseReady');
    },
    // 再生終了時
    'PlaybackFinished': function () {
        this.emit('SoundsOfRainIntent');
    },
    // 再生停止時
    'PlaybackStopped': function () {
        this.emit(':responseReady');
    },
    // 再生終了が近い時
    'PlaybackNearlyFinished': function () {
        this.emit(':responseReady');
    },
    // 再生失敗時
    'PlaybackFailed': function () {
        this.emit(':responseReady');
    },

};
