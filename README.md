[![CircleCI](https://circleci.com/gh/x-blood/alexa-sounds-of-rain.svg?style=svg)](https://circleci.com/gh/x-blood/alexa-sounds-of-rain)


# alexa-sounds-of-rain
[五月雨(さみだれ)の音](https://www.amazon.co.jp/dp/B07DVVJ8KC)  

## セットアップ
### node.jsのセットアップ(Linux & Mac)
```
# nvmのインストール
git clone https://github.com/creationix/nvm.git ~/.nvm
source ~/.nvm/nvm.sh

# nvmのバージョン確認
nvm --version

# Node.jsのインストール
nvm install 10.18.0

# Node.jsのバージョン確認
node -v
```

### 推奨：nvmの設定(Linux & Mac)
```
# デフォルトのNode.jsのバージョン指定
nvm alias default v10.18.0

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
### lambdaハンドラー
```
cd src/handlers
npm install
```

### テスト
- [Alexa Skill Test Framework](https://github.com/BrianMacIntosh/alexa-skill-test-framework)を利用する。
- Reference: [Unit Testing: Creating Functional Alexa Skills](https://developer.amazon.com/ja/blogs/alexa/post/35bdad3d-57c8-4623-88c6-815540697af5/unit-testing-create-functional-alexa-skills)  
```
npm install -g chai
npm install -g mocha
cd test
npm install
```

## ローカルテスト実行コマンド
```
mocha test/alexa-sounds-of-rain-tests.js
```

## SAM LOCALによるローカル環境での動作確認方法
- [SAM CLIのインストール](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/sam-cli-requirements.html)
```
sam local invoke "serverlessFunction" --event "./test/event/SoundsOfRainIntent.json"
```

## ASK CLIによるシミュレート
- [ステップ2：ASK CLIのインストールと初期化](https://developer.amazon.com/ja/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html#step-2-install-and-initialize-ask-cli)
- [[Alexa] 遂にでた！ Alexa Skill Kit のCLIでデプロイまでやってみた](https://dev.classmethod.jp/cloud/ask-cli/)
```
#初期化(※profileはxbloodを指定←awsとはまた別)
ask init

#シミュレートの実行(LaunchRequest)
ask simulate --text "さみだれのおとを開いて" --locale ja-JP --skill-id ${ALEXA_SOUNDS_OF_RAIN_APP_ID}

#シミュレートの実行(SoundOfRainIntent)
ask simulate --text "リラックスしたい" --locale ja-JP --skill-id ${ALEXA_SOUNDS_OF_RAIN_APP_ID}
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

## エイリアス
| エイリアス名 | バージョン名 | 説明 |
---- | ---- | ----
| prod | (手動による指定) | Production environment |

リリース(公開・再公開)する時のエンドポイントはエイリアスを指定すること

## デプロイコマンド
内容はデプロイシェル参照のこと
```
sh ./deploy.sh
```

## **本番環境デプロイ手順**
1. 環境変数 `ALEXA_SOUNDS_OF_RAIN_STAGE` に `prod` を指定する
1. `sh ./deploy.sh` コマンドを実行し、LambdaファンクションをAWSにデプロイする
1. マネージメントコンソールから手動でLambdaファンクションに `Version` を作成する
1. 既存エイリアス名 `prod` を `削除` する
1. 既存エイリアス名 `prod` を `再作成` する。この時、作成した `Version` を指定すること
1. エイリアス `prod` のトリガーに `Alexa Skills Kit`を設定する。スキルIDを入力すること
1. テストコンソールおよび実機で動作確認する

## 参考サイト
- [参考サイト一覧](./docs/reference.md)

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