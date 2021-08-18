## category

js

## titles

ESLint

## description

### `.eslintrc`

- env  
  ESLint はファイルごとに静的検証するので、環境特有の`window`などのグローバル変数を解釈できず、エラーを出す  
  それを防ぐため、env で静的検証する環境を指定する  
  たとえば`browser: true`を設定すると、Web の API である`window.onload`や`window.alert`などがまとめて定義される  
  また、ECMAScript もバージョンごとに指定可能  
  ただし、環境を自動でセットアップするツールを使っている場合、ECMAScript のバージョンは変えない方がいいかも

- globals  
  env で有効化した機能を個別に ON/OFF できる  
  たとえば、`alert: false`のようにできる

- parserOptions  
  新しい ES 構文や JSX を ESLint がパースできるようにする（設定例：`ecmaVersion: 2019`）  
  モジュール構文（export や import）は ecmaVersion とは別に`sourceType: 'module'`と指定する  
  環境を自動でセットアップするツールを使っている場合、ECMAScript のバージョンは変えない方がいいかも
