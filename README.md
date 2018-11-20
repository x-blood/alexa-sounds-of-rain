## セットアップ
### node.jsのセットアップ(Linux)
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

### 推奨：nvmの設定(Linux)
```
# デフォルトのNode.jsのバージョン指定
nvm alias default v6.14.1

# ターミナル起動時の指定
vi ~/.bashrc

# 下記情報を入力
if [[ -s ~/.nvm/nvm.sh ]];
 then source ~/.nvm/nvm.sh
fi
```

## 使用する環境変数
事前に下記の環境変数が定義されていること。  
※exportsコマンドなどを用いてデプロイシェルから値を取得できるようにしておくこと。

| 項目名 | 説明 |
----|----
| ALEXA_SOUNDS_OF_RAIN_SOUND_FILE_BASE_URL | サウンドファイルが保存されているURL |
| ALEXA_SOUNDS_OF_RAIN_SOUND_FILE_BASE_NAME | サウンドファイルの連番を付与する前の基本名。 |
| ALEXA_SOUNDS_OF_RAIN_APP_ID | スキルID |

## エイリアスの定義
| エイリアス名 | バージョン名 | 説明 |
---- | ---- | ----
| (非修飾) | $LATEST | Production environment |

### 経緯
初回リリース時にエイリアスを指定しないLambda Endpointを利用していたため、  
現在はProductionが非修飾になっている。

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

## 参考サイト - 技術系
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