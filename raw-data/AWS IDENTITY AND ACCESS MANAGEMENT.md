## category

aws

## titles

AWS Identity and Access Management
IAM

## description

### ユーザー

ユーザーを作成し、アクセスキーとシークレットアクセスキーの発行  
1 ユーザーで複数のアクセスキーを発行することも可能

### ロール

ロールにポリシーを付与して、AWS リソースに対して権限を付与できる  
たとえば、ECS のタスク実行ロールなど

<a href="https://qiita.com/kurosame/items/eaf14614f1fa23d01040" target="_blank">AssumeRole を ECS&Digdag 環境で利用する</a>

### ポリシー

1. AWS のサービスを選択
1. サービス内のアクションを選択
1. アクションのリソース（影響範囲）を指定

作成したポリシーはユーザーやロールに紐付けることができる

ポリシーは必要最低限の影響範囲にして作成するのが望ましい
