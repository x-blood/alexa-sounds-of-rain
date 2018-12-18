# CircleCI Setup

## 初回セットアップ(Mac)
```
# ローカル実行のためのCLIをインストール
sudo curl https://raw.githubusercontent.com/CircleCI-Public/circleci-cli/master/install.sh \
--fail --show-error | bash

# アップデートの確認
circleci update check

# アップデートにインストール
circleci update install
```

## configファイル検証
```
# .circleci/config.ymlファイルがあるプロジェクトのカレントディレクトリで実行
circleci config validate
```

## localでの動作確認
```
circleci config validate
```