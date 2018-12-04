## category

package-manager

## titles

npm
npx

## description

npm v5.2.0 から同梱された  
npm v5.2.0 以降に上げるか、node v8.2.0 以降に上げれば使える

ローカルにインストールしたパッケージを以下のコマンドで実行する

```sh
npx パッケージ名
```

以下の従来のやり方 3 パターンより簡単に実行できる

1.  ./node_modules/.bin/パッケージ名で実行
1.  $(npm bin)/パッケージ名で実行
1.  package.json に npm-scripts を記述して実行

ローカルにインストールしていないパッケージを実行した場合は、  
1 回だけ実行され、グローバル領域にインストールし、その後グローバル領域から削除される
