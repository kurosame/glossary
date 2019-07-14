## category

package-manager

## titles

npm

## description

Node.js 上で動く  
npm はデフォルトで Node.js に含まれている

1. package.json もしくは lock ファイルを読み込む
1. node_modules に存在しないパッケージのメタデータを fetch する
1. 依存ツリーを計算し、トップレベルの node_modules に flat される
   - バージョンが衝突しない場合、トップレベルの node_modules に flat される
     - サイズを軽減できる
     - npm v3 からこの仕組みが採用されている
   - バージョンが衝突した場合、そのモジュールの子の node_modules に展開し、衝突を回避している
1. 存在しないパッケージを node_modules にダウンロードする

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
