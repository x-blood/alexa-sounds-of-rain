const alexaTest = require('alexa-skill-test-framework');

alexaTest.initialize(
	require('../src/handlers/index.js'),
	"amzn1.ask.skill.00000000-0000-0000-0000-000000000000",
	"amzn1.ask.account.VOID");

describe("Sounds Of Rain", function () {
	describe("LaunchRequest", function () {
		alexaTest.test([
			{
				request: alexaTest.getLaunchRequest(),
                saysLike: "再生して、リラックスしたい、集中したい、眠りたいなど喋りかけてみてください。雨音が流れます。<say-as interpret-as=\"interjection\">さぁ、どうぞ？</say-as>",
                repromptsLike: "再生して、リラックスしたい、集中したい、眠りたいなど喋りかけてみてください。雨音が流れます。<say-as interpret-as=\"interjection\">さぁ、どうぞ？</say-as>",
                repromptsNothing: false, shouldEndSession: false
			}
		]);
	});

	describe("SoundsOfRainIntent", function () {
		alexaTest.test([
			{
				request: alexaTest.getIntentRequest("SoundsOfRainIntent"),
                says: "<say-as interpret-as=\"interjection\">お疲れ様です</say-as>",
                repromptsNothing: true, shouldEndSession: true
			}
		]);
	});
});