## category

package-manager

## titles

npm

## description

Node.js 上で動く  
npm はデフォルトで Node.js に含まれている

### npm のレジストリ

公開（`npm publish`）・非公開（`npm deprecate`）と設定できる  
一旦、公開されたモジュールを非公開にすべきではない（間違えた時などに限定して使うべき）  
公開されたモジュールは`npm install`でインストールできる

### npm v4 時代

- Yarn の方が速い
- npm-shrinkwrap.json によるバージョン管理（`npm install`とは別に`npm shrinkwrap`を実行する必要がある）

### npm v5 時代

- 速度が改善された（ただし、Yarn の方がまだ速い）
- yarn.lock に相当する package-lock.json が作られるようになった
- npm v5 は Node.js v8 以降に含まれている

### グローバル領域（global install）

`~/.npm`

### パッケージを全て最新にしたい

```sh
npm install -g npm-check-updates
npm-check-updates -u // package.jsonのパッケージを全て最新にして上書く
npm update // package.jsonに記載してあるバージョンに更新する
npm install
```
