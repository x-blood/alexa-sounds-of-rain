'use strict';
const Alexa = require('ask-sdk');

const HELP_MESSAGE = "再生して、リラックスしたい、集中したい、眠りたいなど喋りかけてみてください。雨音が流れます。<say-as interpret-as=\"interjection\">さぁ、どうぞ？</say-as>";
const STOP_MESSAGE = "ストップしました。";
const CANCEL_MESSAGE = "キャンセルしました。";
const UNHANDLED_MESSAGE = "<say-as interpret-as=\"interjection\">ありゃ</say-as>、うまくいきませんでした。";

const soundFileBaseUrl = process.env.SoundFileBaseUrl;
const soundFileBaseFileName = process.env.SoundFileBaseName;
const stage = process.env.Stage;

// exports.handler = function(event, context, callback) {
//     var alexa = Alexa.handler(event, context);
//     alexa.appId = process.env.AppId;
//     alexa.registerHandlers(handlers);
//     alexa.execute();
// };

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        console.log('Start LaunchRequest');
        return handlerInput.responseBuilder
            .speak(HELP_MESSAGE)
            .reprompt(HELP_MESSAGE)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        console.log('Start HelpIntent');
        return handlerInput.responseBuilder
            .speak(HELP_MESSAGE)
            .reprompt(HELP_MESSAGE)
            .getResponse();
    },
};

const SoundsOfRainIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'SoundsOfRainIntent';
    },
    handle(handlerInput) {
        console.log('Start SoundsOfRainIntent');
        let speechOut = '<say-as interpret-as="interjection">お疲れ様です</say-as>';
        if (stage === 'dev') {
            speechOut = '<say-as interpret-as="interjection">開発、お疲れ様です。</say-as>';
        }
        return handlerInput.responseBuilder
            .speak(speechOut)
            .addAudioPlayerPlayDirective(
                'REPLACE_ALL', // playBehavior
                soundFileBaseUrl + soundFileBaseFileName + "-002.mp3", // url
                1, // token
                0, // offsetInMilliseconds
                null // expectedPreviousToken
            )
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
            || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        console.log('Start Cancel or Stop Intent');
        return handlerInput.responseBuilder
            .speak(STOP_MESSAGE)
            .addAudioPlayerClearQueueDirective('CLEAR_ALL')
            .getResponse();
    },
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
        return handlerInput.responseBuilder.getResponse();
    },
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        return handlerInput.responseBuilder
            .speak(UNHANDLED_MESSAGE)
            .getResponse();
    },
};

const PlaybackNearlyFinishedHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'AudioPlayer'
            && handlerInput.requestEnvelope.request.intent.name === 'AudioPlayer.PlaybackNearlyFinished';
    },
    handle(handlerInput) {
        console.log('Start PlaybackNearlyFinished');
        var previousToken = 1;
        const AudioPlayer = handlerInput.requestEnvelope.context.AudioPlayer;
        if (AudioPlayer.token) {
            previousToken = AudioPlayer.token
        }
        var nextToken = previousToken
        nextToken++

        return handlerInput.responseBuilder
            .addAudioPlayerPlayDirective(
                'ENQUEUE',
                soundFileBaseUrl + soundFileBaseFileName + "-002.mp3",
                previousToken,
                0,
                nextToken
            )
            .getResponse();
    },
};

const PauseIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PauseIntent';
    },
    handle(handlerInput) {
        console.log('Start PauseIntent');
        return handlerInput.responseBuilder
            .getResponse();
    },
};

const ResumeIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ResumeIntent';
    },
    handle(handlerInput) {
        console.log('Start ResumeIntent');
        const AudioPlayer = handlerInput.requestEnvelope.context.AudioPlayer;
        const offset = AudioPlayer.offsetInMilliseconds;
        return handlerInput.responseBuilder
            .addAudioPlayerPlayDirective(
                'REPLACE_ALL',
                soundFileBaseUrl + soundFileBaseFileName + "-002.mp3",
                1,
                offset
            )
            .getResponse();
    },
};

// var handlers = {
    // 起動
    // 'LaunchRequest': function () {
    //     console.log('Start LaunchRequest');
    //     this.emit(':ask', HELP_MESSAGE);
    //     console.log('End LaunchRequest');
    // },
    // 'SoundsOfRainIntent': function () {
    //     console.log('Start SoundsOfRainIntent');

    //     let speechOut = '<say-as interpret-as="interjection">お疲れ様です</say-as>';
    //     this.response.speak(speechOut).audioPlayerPlay('REPLACE_ALL',
    //         soundFileBaseUrl + soundFileBaseFileName + "-002.mp3", 1, null, 0);
    //     this.emit(':responseReady');

    //     console.log('End SoundsOfRainIntent');
    // },
    // ヘルプ
    // 'AMAZON.HelpIntent': function () {
    //     console.log('Start HelpIntent');
    //     this.emit(':ask', HELP_MESSAGE);
    //     console.log('End HelpIntent');
    // },
    // キャンセル(終了)
    // 'AMAZON.CancelIntent': function () {
    //     console.log('Start CancelIntent');
    //     this.response.speak(CANCEL_MESSAGE);
    //     this.response.audioPlayerClearQueue('CLEAR_ALL');
    //     this.emit(':responseReady');
    //     console.log('End CancelIntent');
    // },
    // ストップ(終了)
    // 'AMAZON.StopIntent': function () {
    //     console.log('Start StopIntent');
    //     this.response.speak(STOP_MESSAGE);
    //     this.response.audioPlayerClearQueue('CLEAR_ALL');
    //     this.emit(':responseReady');
    //     console.log('End StopIntent');
    // },
    // 一時停止
    // 'AMAZON.PauseIntent': function () {
    //     console.log('Start PauseIntent');
    //     this.response.audioPlayerStop();
    //     this.emit(':responseReady');
    //     console.log('End PauseIntent');
    // },
    // 再開
    // 'AMAZON.ResumeIntent': function () {
    //     console.log('Start ResumeIntent');
    //     var offset = this.event.context.AudioPlayer.offsetInMilliseconds;
    //     this.response.audioPlayerPlay('REPLACE_ALL',
    //         soundFileBaseUrl + soundFileBaseFileName + "-002.mp3", 1, null, offset);
    //     this.emit(':responseReady');
    //     console.log('End ResumeIntent');
    // },
    // 'Unhandled': function () {
    //     console.log('Start Unhandled');
    //     this.emit(':tell', UNHANDLED_MESSAGE);
    //     console.log('End Unhandled');
    // },
    // 再生開始時
    // 'PlaybackStarted': function () {
    //     console.log('Start PlaybackStarted');
    //     this.emit(':responseReady');
    //     console.log('End PlaybackStarted');
    // },
    // 再生終了時
    // 'PlaybackFinished': function () {
    //     console.log('Start PlaybackFinished');
    //     this.emit(':responseReady');
    //     console.log('End PlaybackFinished');
    // },
    // 再生停止時
    // 'PlaybackStopped': function () {
    //     this.emit(':responseReady');
    //     console.log('End PlaybackStopped');
    // },
    // 再生終了が近い時
    // 'PlaybackNearlyFinished': function () {
    //     console.log('Start PlaybackNearlyFinished');

    //     var previousToken = 1;
    //     if (this.event.context.AudioPlayer.token) {
    //         previousToken = this.event.context.AudioPlayer.token;
    //         console.log('previousToken : ' + previousToken);
    //     }
    //     var nextToken = previousToken;
    //     nextToken++;
    //     console.log('nextToken : ' + nextToken);

    //     this.response.audioPlayerPlay('ENQUEUE',
    //         soundFileBaseUrl + soundFileBaseFileName + "-002.mp3",
    //         nextToken, previousToken, 0);

    //     this.emit(':responseReady');
    //     console.log('End PlaybackNearlyFinished');
    // },
    // 再生失敗時
    // 'PlaybackFailed': function () {
    //     console.log('Start PlaybackFailed');
    //     this.emit(':responseReady');
    //     console.log('End PlaybackFailed');
    // },

// };

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpIntentHandler,
    SoundsOfRainIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    PlaybackNearlyFinishedHandler,
    PauseIntentHandler,
    ResumeIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
