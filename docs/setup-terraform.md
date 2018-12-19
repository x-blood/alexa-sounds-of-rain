# Terraform Setup
開発環境はMac前提となります。

## ダウンロードしてPATHを通す
```
# downloads/terraform配下の例
vi ~/.bash_profile
export PATH="$PATH:/Users/xblood/Downloads/terraform"
```

## 動作確認
```
terraform version
```

## 基本的なコマンド
```
# 初期化
terraform init
# 適用計画の確認
terraform plan
# 適用
terraform apply
```