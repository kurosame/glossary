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
