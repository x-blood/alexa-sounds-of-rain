'use strict';
const Alexa = require('ask-sdk');

const HELP_MESSAGE = "再生して、リラックスしたい、集中したい、眠りたいなど喋りかけてみてください。雨音が流れます。<say-as interpret-as=\"interjection\">さぁ、どうぞ？</say-as>";
const UNHANDLED_MESSAGE = "<say-as interpret-as=\"interjection\">ありゃ</say-as>、うまくいきませんでした。";

const soundFileBaseUrl = process.env.SoundFileBaseUrl;
const soundFileBaseFileName = process.env.SoundFileBaseName;
const stage = process.env.Stage;

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
            speechOut = '開発、<say-as interpret-as="interjection">お疲れ様です。</say-as>';
        }
        return handlerInput.responseBuilder
            .speak(speechOut)
            .addAudioPlayerPlayDirective(
                'REPLACE_ALL',                                          // playBehavior
                soundFileBaseUrl + soundFileBaseFileName + "-002.mp3",  // url
                1,                                                      // token
                0,                                                      // offsetInMilliseconds
                null                                                    // expectedPreviousToken
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
        return handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackNearlyFinished';
    },
    handle(handlerInput) {
        console.log('Start PlaybackNearlyFinished');
        const AudioPlayer = handlerInput.requestEnvelope.context.AudioPlayer;
        var previousToken = AudioPlayer.token;

        var nextToken = previousToken;
        nextToken++;

        console.log('{"AudioPlayer Info": ["status": "PlaybackNearlyFinished", "previousToken": %d, "nextToken": %d]', previousToken, nextToken);

        return handlerInput.responseBuilder
            .addAudioPlayerPlayDirective(
                'ENQUEUE',
                soundFileBaseUrl + soundFileBaseFileName + "-002.mp3",
                nextToken,
                0,
                previousToken
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
            .addAudioPlayerStopDirective()
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
        const token = AudioPlayer.token;
        const offset = AudioPlayer.offsetInMilliseconds;
        console.log('{"AudioPlayer Info": ["status": "ResumeIntent", "token": %d, "offset": %d]', token, offset);
        return handlerInput.responseBuilder
            .addAudioPlayerPlayDirective(
                'REPLACE_ALL',
                soundFileBaseUrl + soundFileBaseFileName + "-002.mp3",
                token,
                offset,
                null
            )
            .getResponse();
    },
};

const PlaybackHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackStarted'
            || handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackFinished'
            || handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackStopped'
            || handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackStarted'
            || handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackFailed';
    },
    handle(handlerInput) {
        console.log('No Use: %s', handlerInput.requestEnvelope.request.type);
        return handlerInput.responseBuilder
            .getResponse();
    },
};

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
    ResumeIntentHandler,
    PlaybackHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
