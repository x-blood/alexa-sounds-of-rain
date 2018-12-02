## セットアップ
### node.jsのセットアップ(Linux & Mac)
```
# nvmのインストール
git clone https://github.com/creationix/nvm.git ~/.nvm
source ~/.nvm/nvm.sh

# nvmのバージョン確認
nvm --version

# Node.jsのインストール
nvm install 6.14.1

# Node.jsのバージョン確認
node -v
```

### 推奨：nvmの設定(Linux & Mac)
```
# デフォルトのNode.jsのバージョン指定
nvm alias default v6.14.1

# ターミナル起動時の指定
## Linuxの場合
vi ~/.bashrc
## Macの場合
vi ~/.bash_profile

# 下記情報を入力
if [[ -s ~/.nvm/nvm.sh ]];
 then source ~/.nvm/nvm.sh
fi
```

## 必要な外部ライブラリのインストール
```
cd src/handlers
# alexa-sdk
npm install --save ask-sdk
```

## テストに必要な外部ライブラリのインストール
- [Alexa Skill Test Framework](https://github.com/BrianMacIntosh/alexa-skill-test-framework)を利用する。
- Reference: [Unit Testing: Creating Functional Alexa Skills](https://developer.amazon.com/ja/blogs/alexa/post/35bdad3d-57c8-4623-88c6-815540697af5/unit-testing-create-functional-alexa-skills)  
```
npm install -g chai
npm install -g mocha
cd test
npm install alexa-skill-test-framework --save-dev .
```

## ローカルテスト実行コマンド
```
mocha test/alexa-sounds-of-rain-tests.js
```

## AWS SAM CLIのインストール
- [SAM CLIのインストール](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/sam-cli-requirements.html)

## SAM LOCALによるローカル環境での動作確認方法
```
sam local invoke "serverlessFunction" --event "./test/event/SoundsOfRainIntent.json"
```

## ASK CLIのインストール
- [ステップ2：ASK CLIのインストールと初期化](https://developer.amazon.com/ja/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html#step-2-install-and-initialize-ask-cli)
```
# Version確認
ask -v
```

## ASK CLIによるシミュレート
- [[Alexa] 遂にでた！ Alexa Skill Kit のCLIでデプロイまでやってみた](https://dev.classmethod.jp/cloud/ask-cli/)
```
#初期化(※profileはxbloodを指定←awsとはまた別)
ask init
#シミュレートの実行(LaunchRequest)
ask simulate --text "さみだれのおとを開いて" --locale ja-JP --skill-id ${ALEXA_SOUNDS_OF_RAIN_APP_ID} --profile xblood
#シミュレートの実行(SoundOfRainIntent)
ask simulate --text "リラックスしたい" --locale ja-JP --skill-id ${ALEXA_SOUNDS_OF_RAIN_APP_ID} --profile xblood
```

## 使用する環境変数
事前に下記の環境変数が定義されていること。  
※exportsコマンドなどを用いてデプロイシェルから値を取得できるようにしておくこと。

| 項目名 | 説明 |
----|----
| ALEXA_SOUNDS_OF_RAIN_SOUND_FILE_BASE_URL | サウンドファイルが保存されているURL |
| ALEXA_SOUNDS_OF_RAIN_SOUND_FILE_BASE_NAME | サウンドファイルの連番を付与する前の基本名。 |
| ALEXA_SOUNDS_OF_RAIN_APP_ID | スキルID |
| ALEXA_SOUNDS_OF_RAIN_STAGE | デプロイ対象の指定。"dev" or "prod" |

## エイリアスの定義
| エイリアス名 | バージョン名 | 説明 |
---- | ---- | ----
| prod | (auto increment) | Production environment |
| dev | (auto increment) | Develop environment |

## S3バケットのスタック作成(1度きりの作業)
```
# 検証実行
aws cloudformation validate-template \
  --template-body file://s3package.yml \
  --profile xblood

# スタックの作成
aws cloudformation create-stack \
  --stack-name alexa-sounds-of-rain-s3-buckets \
  --template-body file://s3package.yml \
  --profile xblood

# スタックの更新
aws cloudformation update-stack \
  --stack-name alexa-sounds-of-rain-s3-buckets \
  --template-body file://s3package.yml \
  --profile xblood

# スタックの削除
aws cloudformation delete-stack \
  --stack-name alexa-sounds-of-rain-s3-buckets \
  --profile xblood
```
## デプロイコマンド
内容はデプロイシェル参照のこと
```
sh ./deploy.sh
```

## 参考サイト - 旧SDK(1系)
- [Alexaでハリーポッターの呪文を唱えるスキルを作った](http://atskimura.hatenablog.com/entry/2018/01/08/222701)
- [Alexa Skills Kit for Node.js (alexa-sdk) で音楽ファイルを鳴らす](https://qiita.com/alpha2048/items/aa30bfef89f3b8eaf029)
- [Amazon Alexaで自然な発話をする方法](https://qiita.com/tochi/items/0ddf63953ccd98ac315c)
- [AWS公式 一般的標準インテント](https://developer.amazon.com/ja/docs/custom-skills/standard-built-in-intents.html)
- [AWS公式 Speechconリファレンス（感嘆詞）: 日本語](https://developer.amazon.com/ja/docs/custom-skills/speechcon-reference-interjections-japanese.html)
- [AudioPlayerでハローワールド](https://dev.classmethod.jp/cloud/aws/hello-world-alexa-skill-audioplayer/)
- [AudioPlayerの再生キューの活用](https://dev.classmethod.jp/cloud/aws/using_audio_player_queue/)
- [Alexa SkillのAudioPlayer機能【実装編】](https://kotodama.today/?p=881)

## 参考サイト - 音楽素材系
- [効果音ラボ](https://soundeffect-lab.info/sound/animal/)

## 参考サイト - 画像素材系
- [photoAC](https://www.photo-ac.com/)
- [Pixabay · 魅力的なフリー画像](https://pixabay.com/)

## 参考サイト - 公式キャンペーンなど
- [AlexaのAWSプロモーションクレジットのご紹介](https://developer.amazon.com/ja/alexa-skills-kit/alexa-aws-credits)
- [スキル開発者への特典](https://developer.amazon.com/ja/alexa-skills-kit/alexa-developer-skill-promotion)

## 参考サイト - ASK SDK for Node.js 2
- [利用可能なメソッド](https://ask-sdk-for-nodejs.readthedocs.io/ja/latest/Building-Response.html)
- [Alexa-SDK Ver2（その8) AudioPlayer](https://dev.classmethod.jp/cloud/alexa-sdk-v2-eighth/)
- [(古いバージョンの奴)Alexa Skills Kit SDK for Node.js ざっくり訳](https://qiita.com/HeRo/items/8475505a55cc9e737687)

## 参考サイト - GitHub
- [audio-stream-starter-alexa](https://github.com/skilltemplates/audio-stream-starter-alexa/blob/ef56a806c70d3983ce6c106612e6daa03011b1a5/lambda/custom/index.js)
- [skill-sample-nodejs-audio-player(TypeScript)](https://github.com/alexa/skill-sample-nodejs-audio-player/blob/mainline/single-stream/lambda/src/IntentHandlers.ts)
- [skill-sample-nodejs-audio-player(JS)](https://github.com/alexa/skill-sample-nodejs-audio-player/blob/mainline/multiple-streams/lambda/src/index.js)

