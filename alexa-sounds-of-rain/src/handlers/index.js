'use strict';
var Alexa = require('alexa-sdk');

var HELP_MESSAGE = "さみだれを起動して、と発音すると、雨音が流れます。現在のバージョンは、" + process.env.Version + "です。";
var STOP_MESSAGE = "<say-as interpret-as=\"interjection\">バイバイ</say-as>";
var UNHANDLED_MESSAGE = "<say-as interpret-as=\"interjection\">ありゃ</say-as>、うまくいきませんでした。";

const soundFileBaseUrl = process.env.SoundFileBaseUrl;
const soundFileBaseFileName = process.env.SoundFileBaseName;

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = process.env.AppId;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        console.log('Start LaunchRequest');
        this.emit('SoundsOfRainIntent');
        console.log('End LaunchRequest');
    },
    'SoundsOfRainIntent': function () {
        console.log('Start SoundsOfRainIntent');

        let speechOut = '<say-as interpret-as="interjection">それでは、どうぞ。</say-as>';
        this.response.speak(speechOut).audioPlayerPlay('REPLACE_ALL',
            soundFileBaseUrl + soundFileBaseFileName + "-002.mp3", 1, null, 0);
        this.emit(':responseReady');

        console.log('End SoundsOfRainIntent');
    },
    // 標準ビルトインテント
    'AMAZON.HelpIntent': function () {
        console.log('Start HelpIntent');
        this.emit(':tell', HELP_MESSAGE);
        console.log('End HelpIntent');
    },
    'AMAZON.CancelIntent': function () {
        console.log('Start CancelIntent');
        this.response.speak(STOP_MESSAGE).audioPlayerStop();
        this.emit(':responseReady');
        console.log('End CancelIntent');
    },
    'AMAZON.StopIntent': function () {
        console.log('Start StopIntent');
        this.response.speak(STOP_MESSAGE).audioPlayerStop();
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
        var offset = this.event.context.AudioPlayer.offsetInMilliseconds;
        this.response.audioPlayerPlay('REPLACE_ALL',
            soundFileBaseUrl + soundFileBaseFileName + "-002.mp3", 1, null, offset);
        this.emit(':responseReady');
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
        this.emit(':responseReady');
        console.log('End PlaybackStopped');
    },
    // 再生終了が近い時
    'PlaybackNearlyFinished': function () {
        console.log('Start PlaybackNearlyFinished');

        var previousToken = 1;
        if (this.event.context.AudioPlayer.token) {
            previousToken = this.event.context.AudioPlayer.token;
            console.log('previousToken : ' + previousToken);
        }
        var nextToken = previousToken;
        nextToken++;
        console.log('nextToken : ' + nextToken);

        this.response.audioPlayerPlay('ENQUEUE',
            soundFileBaseUrl + soundFileBaseFileName + "-002.mp3",
            nextToken, previousToken, 0);

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
