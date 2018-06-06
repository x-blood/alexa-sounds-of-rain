## セットアップ
- [セットアップは別ドキュメント参照のこと](../alexa-reservation-room/README.md)

## S3パッケージのスタック作成
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
