## category

module-bundler

## titles

webpack

## description

Browserify や Rollup が JS のバンドルにフォーカスしているのに対し、  
webpack は CSS などの JS 以外のファイルも JS にバンドルする

### loader

対象のモジュールを JS で使える形にする  
エントリーポイントから input されたモジュール全てを正規表現で検索できる

### plugin

loader 以外の色々、最終的に JS に変換する必要がないもの

### bundle.js の中身

即時関数となっているので、ブラウザで bundle.js を読み込んだ時点で実行される

```js
(function(modules) { // webpackBootstrap
...
})
```

上記の即時関数内に`__webpack_require__`関数が定義されている

```js
function __webpack_require__(moduleId) {
  // モジュールのキャッシュがあるか確認
  // キャッシュがある場合は、そのキャッシュされているモジュールのexportsを返す
  // moduleIdはモジュールごとの一意のID
  if (installedModules[moduleId]) {
    return installedModules[moduleId].exports
  }

  // モジュールを作成＆キャッシュに格納
  var module = (installedModules[moduleId] = {
    i: moduleId,
    l: false,
    exports: {}
  })

  // 関数を実行する
  // modulesには全てのモジュールが入っている
  modules[moduleId].call(
    module.exports,
    module,
    module.exports,
    __webpack_require__
  )

  // loadedフラグをtrue
  module.l = true

  return module.exports
}
```

その後は、`__webpack_require__`関数を介して、モジュールを拡張していく

### Tree Shaking

v2 から追加された機能  
export されているが、どこからも import されていない関数や変数を静的解析にて削除する

CommonJS の require/exports は動的に実装できる  
静的な import/export と違い静的解析ができないため Tree Shaking できない

使用するには、Babel による import 文の CommonJS への変換を防ぐ必要がある為、以下の指定が必要

```json
["env", { "modules": false }]
```

Tree Shaking の対象となるモジュールがあっても副作用を含む場合は、Tree Shaking されない  
webpack.UglifyJS.pure_funcs や webpack4 から使える package.json の sideEffects オプションで  
モジュールの副作用の有無を明示的に書く必要がある

### ESModules と WebAssembly のサポート

webpack v4 からエントリーポイントに`.mjs`と`.wasm`を指定できるようになった

### webpack-dev-server による HMR の流れ

1. webpack がファイルの変更を監視
1. ファイルの変更があった場合、webpack コンパイラーが変更のみを含む ChunkJS とメタ情報を持つ ManifestJSON を生成する
1. webpack-dev-server で ChunkJS と ManifestJSON を配信する
1. WebSocket 経由で webpack-dev-server から webpack-dev-server/client へコンパイル結果と HashID を送る
1. webpack/hot/dev-server のランタイムで HashID を基に新しい ChunkJS と ManifestJSON を webpack-dev-server から取得する
1. 既存コードと新規コードを差し替える
