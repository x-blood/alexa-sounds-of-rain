## セットアップ
- [セットアップは別ドキュメント参照のこと](../alexa-reservation-room/README.md)

## 使用する環境変数
事前に下記の環境変数が定義されていること。  
※exportsコマンドなどを用いてデプロイシェルから値を取得できるようにしておくこと。

| 項目名 | 説明 |
----|---- 
| ALEXA_SOUNDS_OF_RAIN_SOUND_FILE_BASE_URL | サウンドファイルが保存されているURL |
| ALEXA_SOUNDS_OF_RAIN_SOUND_FILE_BASE_NAME | サウンドファイルの連番を付与する前の基本名。 |
| ALEXA_SOUNDS_OF_RAIN_APP_ID | スキルID |

## S3バケットのスタック作成(1度きりの作業)
```
# 検証実行
aws cloudformation validate-template \
  --template-body file://s3package.yml \
  --profile handson20180323

# スタックの作成
aws cloudformation create-stack \
  --stack-name alexa-sounds-of-rain-s3-buckets \
  --template-body file://s3package.yml \
  --profile handson20180323

# スタックの更新
aws cloudformation update-stack \
  --stack-name alexa-sounds-of-rain-s3-buckets \
  --template-body file://s3package.yml \
  --profile handson20180323

# スタックの削除
aws cloudformation delete-stack \
  --stack-name alexa-sounds-of-rain-s3-buckets \
  --profile handson20180323
```
## デプロイコマンド
内容はデプロイシェル参照のこと
```
sh ./deploy.sh
```

## 参考サイト
- [Alexaでハリーポッターの呪文を唱えるスキルを作った](http://atskimura.hatenablog.com/entry/2018/01/08/222701)
- [Alexa Skills Kit for Node.js (alexa-sdk) で音楽ファイルを鳴らす](https://qiita.com/alpha2048/items/aa30bfef89f3b8eaf029)
- [Amazon Alexaで自然な発話をする方法](https://qiita.com/tochi/items/0ddf63953ccd98ac315c)
