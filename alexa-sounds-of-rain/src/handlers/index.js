'use strict';
var Alexa = require('alexa-sdk');

var HELP_MESSAGE = "雨音を再生して、や、雨音を流して、などの発音で、雨音を再生します。現在のバージョンは、" + process.env.Version + "です。";
var STOP_MESSAGE = "<say-as interpret-as=\"interjection\">バイバイ</say-as>";
var UNHANDLED_MESSAGE = "<say-as interpret-as=\"interjection\">ありゃ</say-as>";

exports.handler = function(event, context, callback) {
    console.log('start handler');
    var alexa = Alexa.handler(event, context);
    console.log('AppId : ' + process.env.AppId);
    alexa.appId = process.env.AppId;
    alexa.registerHandlers(handlers);
    alexa.execute();
    console.log('end handler');
};

var handlers = {
    'LaunchRequest': function () {
        console.log('Start LaunchRequest');
        this.emit('SoundsOfRainIntent');
        console.log('End LaunchRequest');
    },
    'SoundsOfRainIntent': function () {
        console.log('Start SoundsOfRainIntent');
        
        var soundFileBaseUrl = process.env.SoundFileBaseUrl;
        console.log('soundFileBaseUrl : ' + soundFileBaseUrl);
        var soundFileBaseFileName = process.env.SoundFileBaseName;
        console.log('soundFileBaseFileName : ' + soundFileBaseFileName);

        let speechOut = '<say-as interpret-as="interjection">んじゃ</say-as>、雨音を再生します。';
        speechOut += "<audio src='" + soundFileBaseUrl + soundFileBaseFileName + "-001.mp3' />";
        // this.emit(':tell', speechOut);

        // const loopMode = this.t('LOOP_ON');
        // this.response.speak(loopMode);
        this.attributes['loop'] = true;
        this.response.audioPlayerPlay('REPLACE_ALL',
            soundFileBaseUrl + soundFileBaseFileName + "-001.mp3",
            "soundsOfRainToken", null, 0);
        this.emit(':responseReady');

        console.log('End SoundsOfRainIntent');
    },
    'AMAZON.HelpIntent': function () {
        console.log('Start HelpIntent');
        this.emit(':tell', HELP_MESSAGE);
        console.log('End HelpIntent');
    },
    'AMAZON.CancelIntent': function () {
        console.log('Start CancelIntent');
        // this.emit(':tell', STOP_MESSAGE);
        this.response.audioPlayerStop();
        this.emit(':responseReady');
        console.log('End CancelIntent');
    },
    'AMAZON.StopIntent': function () {
        console.log('Start StopIntent');
        // this.emit(':tell', STOP_MESSAGE);
        this.response.audioPlayerStop();
        this.emit(':responseReady');
        console.log('End StopIntent');
    },
    'AMAZON.PauseIntent': function () {
        console.log('Start PauseIntent');
        this.response.audioPlayerStop();
        this.emit(':responseReady');
        console.log('End PauseIntent');
    },
    'AMAZON.ResumeIntent': function () {
        console.log('Start ResumeIntent');
        this.emit('SoundsOfRainIntent');
        console.log('End ResumeIntent');
    },
    'Unhandled': function () {
        console.log('Start Unhandled');
        this.emit(':tell', UNHANDLED_MESSAGE);
        console.log('End Unhandled');
    },

    // 再生開始時
    'PlaybackStarted': function () {
        console.log('Start PlaybackStarted');
        this.emit(':responseReady');
        console.log('End PlaybackStarted');
    },
    // 再生終了時
    'PlaybackFinished': function () {
        console.log('Start PlaybackFinished');
        this.emit(':responseReady');
        console.log('End PlaybackFinished');
    },
    // 再生停止時
    'PlaybackStopped': function () {
        console.log('Start PlaybackStopped');
        this.emit(':responseReady');
        console.log('End PlaybackStopped');
    },
    // 再生終了が近い時
    'PlaybackNearlyFinished': function () {
        console.log('Start PlaybackNearlyFinished');
        this.emit(':responseReady');
        console.log('End PlaybackNearlyFinished');
    },
    // 再生失敗時
    'PlaybackFailed': function () {
        console.log('Start PlaybackFailed');
        this.emit(':responseReady');
        console.log('End PlaybackFailed');
    },

};
